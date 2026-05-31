import { describe, it, expect } from "vitest";
import { guidesRouter } from "./guides";

describe("guidesRouter", () => {
  describe("listServices", () => {
    it("should return all services with required fields", async () => {
      const caller = guidesRouter.createCaller({} as any);
      const services = await caller.listServices();

      expect(services).toBeInstanceOf(Array);
      expect(services.length).toBe(5);

      // 각 서비스가 필수 필드를 가지고 있는지 확인
      services.forEach((service) => {
        expect(service).toHaveProperty("id");
        expect(service).toHaveProperty("title");
        expect(service).toHaveProperty("subtitle");
        expect(service).toHaveProperty("badge");
        expect(service).toHaveProperty("icon");
        expect(service).toHaveProperty("description");
      });
    });

    it("should have correct service IDs", async () => {
      const caller = guidesRouter.createCaller({} as any);
      const services = await caller.listServices();
      const ids = services.map((s) => s.id);

      expect(ids).toContain("workers-compensation");
      expect(ids).toContain("employment-insurance-status");
      expect(ids).toContain("business-insurance");
      expect(ids).toContain("visit-checklist");
      expect(ids).toContain("document-followup");
    });
  });

  describe("getService", () => {
    it("should return service details for valid ID", async () => {
      const caller = guidesRouter.createCaller({} as any);
      const service = await caller.getService("workers-compensation");

      expect(service).toBeDefined();
      expect(service.id).toBe("workers-compensation");
      expect(service.title).toBe("산재보상 신청 안내");
      expect(service).toHaveProperty("whatIsThis");
      expect(service).toHaveProperty("whoApplies");
      expect(service).toHaveProperty("preparationMaterials");
      expect(service).toHaveProperty("checklist");
      expect(service).toHaveProperty("disclaimer");
    });

    it("should have required and helpful materials", async () => {
      const caller = guidesRouter.createCaller({} as any);
      const service = await caller.getService("workers-compensation");

      expect(service.preparationMaterials.required).toBeInstanceOf(Array);
      expect(service.preparationMaterials.required.length).toBeGreaterThan(0);
      expect(service.preparationMaterials.helpful).toBeInstanceOf(Array);
    });

    it("should have checklist items", async () => {
      const caller = guidesRouter.createCaller({} as any);
      const service = await caller.getService("workers-compensation");

      expect(service.checklist).toBeInstanceOf(Array);
      expect(service.checklist.length).toBeGreaterThan(0);
    });

    it("should have procedure steps", async () => {
      const caller = guidesRouter.createCaller({} as any);
      const service = await caller.getService("workers-compensation");

      expect(service.procedure).toBeInstanceOf(Array);
      expect(service.procedure?.length).toBeGreaterThan(0);
      service.procedure?.forEach((proc) => {
        expect(proc).toHaveProperty("step");
        expect(proc).toHaveProperty("description");
      });
    });

    it("should throw error for invalid ID", async () => {
      const caller = guidesRouter.createCaller({} as any);

      try {
        await caller.getService("invalid-id");
        expect.fail("Should have thrown an error");
      } catch (error: any) {
        expect(error.message).toContain("not found");
      }
    });

    it("should have online link for all services", async () => {
      const caller = guidesRouter.createCaller({} as any);
      const services = await caller.listServices();

      for (const service of services) {
        const fullService = await caller.getService(service.id);
        expect(fullService.onlineLink).toBeDefined();
        expect(typeof fullService.onlineLink).toBe("string");
      }
    });

    it("should have disclaimer for all services", async () => {
      const caller = guidesRouter.createCaller({} as any);
      const services = await caller.listServices();

      for (const service of services) {
        const fullService = await caller.getService(service.id);
        expect(fullService.disclaimer).toBeDefined();
        expect(fullService.disclaimer.length).toBeGreaterThan(0);
      }
    });

    it("should have all 5 services with complete data", async () => {
      const caller = guidesRouter.createCaller({} as any);
      const serviceIds = [
        "workers-compensation",
        "employment-insurance-status",
        "business-insurance",
        "visit-checklist",
        "document-followup",
      ];

      for (const id of serviceIds) {
        const service = await caller.getService(id);
        expect(service.id).toBe(id);
        expect(service.title).toBeDefined();
        expect(service.whatIsThis).toBeDefined();
        expect(service.whoApplies).toBeDefined();
        expect(service.typicalCases.length).toBeGreaterThan(0);
      }
    });
  });
});
