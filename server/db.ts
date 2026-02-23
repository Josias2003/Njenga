import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, greenhouses, crops, sensors, alerts, automationRules, aiInsights, zones } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Greenhouse queries
 */
export async function getGreenhousesByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(greenhouses).where(eq(greenhouses.userId, userId));
}

export async function getGreenhouseById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(greenhouses).where(eq(greenhouses.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createGreenhouse(data: typeof greenhouses.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(greenhouses).values(data);
  return result;
}

/**
 * Zone queries
 */
export async function getZonesByGreenhouse(greenhouseId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(zones).where(eq(zones.greenhouseId, greenhouseId));
}

/**
 * Crop queries
 */
export async function getCropsByGreenhouse(greenhouseId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(crops).where(eq(crops.greenhouseId, greenhouseId));
}

export async function getCropById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(crops).where(eq(crops.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCrop(data: typeof crops.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(crops).values(data);
  return result;
}

/**
 * Sensor queries
 */
export async function getSensorsByZone(zoneId: number, limit = 100) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sensors).where(eq(sensors.zoneId, zoneId)).orderBy(desc(sensors.timestamp)).limit(limit);
}

export async function getLatestSensorsByZone(zoneId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(sensors).where(eq(sensors.zoneId, zoneId)).orderBy(desc(sensors.timestamp)).limit(5);
}

export async function createSensor(data: typeof sensors.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(sensors).values(data);
  return result;
}

/**
 * Alert queries
 */
export async function getAlertsByUser(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(alerts).where(eq(alerts.userId, userId)).orderBy(desc(alerts.createdAt));
}

export async function getUnreadAlerts(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(alerts).where(and(eq(alerts.userId, userId), eq(alerts.isRead, false))).orderBy(desc(alerts.createdAt));
}

export async function createAlert(data: typeof alerts.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(alerts).values(data);
  return result;
}

export async function markAlertAsRead(alertId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(alerts).set({ isRead: true }).where(eq(alerts.id, alertId));
}

/**
 * Automation rules queries
 */
export async function getAutomationRulesByZone(zoneId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(automationRules).where(eq(automationRules.zoneId, zoneId));
}

export async function createAutomationRule(data: typeof automationRules.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(automationRules).values(data);
  return result;
}

/**
 * AI Insights queries
 */
export async function getAiInsightsByCrop(cropId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(aiInsights).where(eq(aiInsights.cropId, cropId)).orderBy(desc(aiInsights.createdAt));
}

export async function createAiInsight(data: typeof aiInsights.$inferInsert) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(aiInsights).values(data);
  return result;
}
