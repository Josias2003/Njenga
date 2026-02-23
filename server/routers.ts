import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";

// Mock data for frontend prototype
const mockGreenhouses = [
  { id: 1, userId: 1, name: "Main Greenhouse", location: "Nairobi, Kenya", totalArea: "500", createdAt: new Date(), updatedAt: new Date() },
];

const mockZones = [
  { id: 1, greenhouseId: 1, name: "Zone A - Tomatoes", area: "150", createdAt: new Date() },
  { id: 2, greenhouseId: 1, name: "Zone B - Lettuce", area: "150", createdAt: new Date() },
  { id: 3, greenhouseId: 1, name: "Zone C - Peppers", area: "200", createdAt: new Date() },
];

const mockCrops = [
  { id: 1, greenhouseId: 1, zoneId: 1, name: "Cherry Tomatoes", variety: "Sungold", plantingDate: new Date("2024-12-01"), expectedHarvestDate: new Date("2025-03-15"), status: "growing", createdAt: new Date(), updatedAt: new Date() },
  { id: 2, greenhouseId: 1, zoneId: 2, name: "Butterhead Lettuce", variety: "Bibb", plantingDate: new Date("2025-01-01"), expectedHarvestDate: new Date("2025-02-15"), status: "growing", createdAt: new Date(), updatedAt: new Date() },
];

const mockSensors = [
  { id: 1, zoneId: 1, sensorType: "temperature", value: "28.5", unit: "°C", status: "normal", timestamp: new Date(), createdAt: new Date() },
  { id: 2, zoneId: 1, sensorType: "humidity", value: "72", unit: "%", status: "normal", timestamp: new Date(), createdAt: new Date() },
  { id: 3, zoneId: 1, sensorType: "soilMoisture", value: "55", unit: "%", status: "warning", timestamp: new Date(), createdAt: new Date() },
  { id: 4, zoneId: 1, sensorType: "light", value: "850", unit: "lux", status: "normal", timestamp: new Date(), createdAt: new Date() },
  { id: 5, zoneId: 1, sensorType: "co2", value: "420", unit: "ppm", status: "normal", timestamp: new Date(), createdAt: new Date() },
];

const mockAlerts = [
  { id: 1, userId: 1, greenhouseId: 1, title: "Soil Moisture Low", description: "Zone A soil moisture dropped below 50%", severity: "warning", type: "sensor", isRead: false, createdAt: new Date(Date.now() - 3600000), updatedAt: new Date(Date.now() - 3600000) },
  { id: 2, userId: 1, greenhouseId: 1, title: "Disease Risk Detected", description: "Early Blight detected in Zone A with medium confidence", severity: "critical", type: "ai", isRead: false, createdAt: new Date(Date.now() - 7200000), updatedAt: new Date(Date.now() - 7200000) },
  { id: 3, userId: 1, greenhouseId: 1, title: "Irrigation Activated", description: "Automatic irrigation triggered in Zone A", severity: "warning", type: "automation", isRead: true, createdAt: new Date(Date.now() - 86400000), updatedAt: new Date(Date.now() - 86400000) },
];

const mockAiInsights = [
  { id: 1, cropId: 1, insightType: "healthScore", title: "Crop Health Score", description: "Overall plant health is excellent", value: "85%", recommendation: "Continue current watering schedule", confidence: "92", createdAt: new Date() },
  { id: 2, cropId: 1, insightType: "diseaseRisk", title: "Disease Risk Alert", description: "Early Blight detected in Zone A", value: "Medium Risk", recommendation: "Increase ventilation and reduce leaf wetness", confidence: "78", createdAt: new Date() },
  { id: 3, cropId: 1, insightType: "yieldPrediction", title: "Yield Prediction", description: "Projected yield based on current growth", value: "2.3 tons", recommendation: "Maintain current conditions for optimal yield", confidence: "85", createdAt: new Date() },
];

const mockAutomationRules = [
  { id: 1, zoneId: 1, name: "Temperature Control", triggerType: "temperature", triggerCondition: "greaterThan", triggerValue: "30", action: "Fan ON", isActive: true, createdAt: new Date(), updatedAt: new Date() },
  { id: 2, zoneId: 1, name: "Irrigation Control", triggerType: "soilMoisture", triggerCondition: "lessThan", triggerValue: "40", action: "Irrigation ON", isActive: true, createdAt: new Date(), updatedAt: new Date() },
];

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),

    selectRole: protectedProcedure
      .input(z.enum(["farmer", "agronomist", "admin"]))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can assign roles." });
        }
        return { success: true, role: input };
      }),
  }),

  greenhouse: router({
    list: protectedProcedure.query(async () => {
      return mockGreenhouses;
    }),

    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        location: z.string().optional(),
        totalArea: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return { success: true, data: input };
      }),
  }),

  crop: router({
    listByGreenhouse: protectedProcedure
      .input(z.object({ greenhouseId: z.number() }))
      .query(async () => {
        return mockCrops;
      }),

    create: protectedProcedure
      .input(z.object({
        greenhouseId: z.number(),
        zoneId: z.number().optional(),
        name: z.string(),
        variety: z.string().optional(),
        plantingDate: z.date().optional(),
        expectedHarvestDate: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        return { success: true, data: input };
      }),
  }),

  zone: router({
    listByGreenhouse: protectedProcedure
      .input(z.object({ greenhouseId: z.number() }))
      .query(async () => {
        return mockZones;
      }),
  }),

  sensor: router({
    getByZone: protectedProcedure
      .input(z.object({ zoneId: z.number() }))
      .query(async () => {
        return mockSensors;
      }),

    getLatestByZone: protectedProcedure
      .input(z.object({ zoneId: z.number() }))
      .query(async () => {
        return mockSensors.slice(0, 5);
      }),

    create: protectedProcedure
      .input(z.object({
        zoneId: z.number(),
        sensorType: z.enum(["temperature", "humidity", "soilMoisture", "light", "co2"]),
        value: z.number(),
        unit: z.string().optional(),
        status: z.enum(["normal", "warning", "critical"]).optional(),
      }))
      .mutation(async ({ input }) => {
        return { success: true, data: input };
      }),
  }),

  alert: router({
    listByUser: protectedProcedure.query(async () => {
      return mockAlerts;
    }),

    unread: protectedProcedure.query(async () => {
      return mockAlerts.filter(a => !a.isRead);
    }),

    create: protectedProcedure
      .input(z.object({
        greenhouseId: z.number(),
        title: z.string(),
        description: z.string().optional(),
        severity: z.enum(["critical", "warning"]),
        type: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        return { success: true, data: input };
      }),

    markAsRead: protectedProcedure
      .input(z.object({ alertId: z.number() }))
      .mutation(async () => {
        return { success: true };
      }),
  }),

  automation: router({
    getByZone: protectedProcedure
      .input(z.object({ zoneId: z.number() }))
      .query(async () => {
        return mockAutomationRules;
      }),

    create: protectedProcedure
      .input(z.object({
        zoneId: z.number(),
        name: z.string(),
        triggerType: z.enum(["temperature", "humidity", "soilMoisture", "light", "co2"]),
        triggerCondition: z.enum(["greaterThan", "lessThan", "equals"]),
        triggerValue: z.number(),
        action: z.string(),
      }))
      .mutation(async ({ input }) => {
        return { success: true, data: input };
      }),
  }),

  aiInsight: router({
    getByCrop: protectedProcedure
      .input(z.object({ cropId: z.number() }))
      .query(async () => {
        return mockAiInsights;
      }),

    create: protectedProcedure
      .input(z.object({
        cropId: z.number(),
        insightType: z.enum(["healthScore", "diseaseRisk", "yieldPrediction"]),
        title: z.string(),
        description: z.string().optional(),
        value: z.string().optional(),
        recommendation: z.string().optional(),
        confidence: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        return { success: true, data: input };
      }),
  }),
});

export type AppRouter = typeof appRouter;
