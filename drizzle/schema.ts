import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin", "farmer", "agronomist"]).default("user").notNull(),
  selectedRole: mysqlEnum("selectedRole", ["farmer", "agronomist", "admin"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Greenhouse table - stores greenhouse/farm information
 */
export const greenhouses = mysqlTable("greenhouses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  location: text("location"),
  totalArea: decimal("totalArea", { precision: 10, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Greenhouse = typeof greenhouses.$inferSelect;
export type InsertGreenhouse = typeof greenhouses.$inferInsert;

/**
 * Greenhouse zones/sections
 */
export const zones = mysqlTable("zones", {
  id: int("id").autoincrement().primaryKey(),
  greenhouseId: int("greenhouseId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  area: decimal("area", { precision: 10, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Zone = typeof zones.$inferSelect;
export type InsertZone = typeof zones.$inferInsert;

/**
 * Crop table - stores crop information
 */
export const crops = mysqlTable("crops", {
  id: int("id").autoincrement().primaryKey(),
  greenhouseId: int("greenhouseId").notNull(),
  zoneId: int("zoneId"),
  name: varchar("name", { length: 255 }).notNull(),
  variety: varchar("variety", { length: 255 }),
  plantingDate: timestamp("plantingDate"),
  expectedHarvestDate: timestamp("expectedHarvestDate"),
  status: mysqlEnum("status", ["planning", "growing", "harvesting", "completed"]).default("planning"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Crop = typeof crops.$inferSelect;
export type InsertCrop = typeof crops.$inferInsert;

/**
 * Sensor data table - stores real-time sensor readings
 */
export const sensors = mysqlTable("sensors", {
  id: int("id").autoincrement().primaryKey(),
  zoneId: int("zoneId").notNull(),
  sensorType: mysqlEnum("sensorType", ["temperature", "humidity", "soilMoisture", "light", "co2"]).notNull(),
  value: decimal("value", { precision: 10, scale: 2 }).notNull(),
  unit: varchar("unit", { length: 50 }),
  status: mysqlEnum("status", ["normal", "warning", "critical"]).default("normal"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Sensor = typeof sensors.$inferSelect;
export type InsertSensor = typeof sensors.$inferInsert;

/**
 * Automation rules table - stores automation logic
 */
export const automationRules = mysqlTable("automationRules", {
  id: int("id").autoincrement().primaryKey(),
  zoneId: int("zoneId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  triggerType: mysqlEnum("triggerType", ["temperature", "humidity", "soilMoisture", "light", "co2"]).notNull(),
  triggerCondition: mysqlEnum("triggerCondition", ["greaterThan", "lessThan", "equals"]).notNull(),
  triggerValue: decimal("triggerValue", { precision: 10, scale: 2 }).notNull(),
  action: varchar("action", { length: 255 }).notNull(),
  isActive: boolean("isActive").default(true),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AutomationRule = typeof automationRules.$inferSelect;
export type InsertAutomationRule = typeof automationRules.$inferInsert;

/**
 * Alerts table - stores system alerts and notifications
 */
export const alerts = mysqlTable("alerts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  greenhouseId: int("greenhouseId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  severity: mysqlEnum("severity", ["critical", "warning"]).notNull(),
  type: varchar("type", { length: 100 }),
  isRead: boolean("isRead").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = typeof alerts.$inferInsert;

/**
 * AI Insights table - stores AI-generated recommendations
 */
export const aiInsights = mysqlTable("aiInsights", {
  id: int("id").autoincrement().primaryKey(),
  cropId: int("cropId").notNull(),
  insightType: mysqlEnum("insightType", ["healthScore", "diseaseRisk", "yieldPrediction"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  value: varchar("value", { length: 255 }),
  recommendation: text("recommendation"),
  confidence: decimal("confidence", { precision: 5, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AiInsight = typeof aiInsights.$inferSelect;
export type InsertAiInsight = typeof aiInsights.$inferInsert;

/**
 * Reports table - stores generated reports
 */
export const reports = mysqlTable("reports", {
  id: int("id").autoincrement().primaryKey(),
  greenhouseId: int("greenhouseId").notNull(),
  reportType: mysqlEnum("reportType", ["yield", "waterUsage", "productivity"]).notNull(),
  period: varchar("period", { length: 50 }),
  data: text("data"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Report = typeof reports.$inferSelect;
export type InsertReport = typeof reports.$inferInsert;
