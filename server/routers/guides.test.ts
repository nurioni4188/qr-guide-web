import { describe, expect, it, vi } from "vitest";
import { guidesRouter } from "./guides";
import type { TrpcContext } from "../_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };

  return ctx;
}

describe("guides router", () => {
  it("should have saveGuide procedure", async () => {
    const ctx = createAuthContext();
    const caller = guidesRouter.createCaller(ctx);

    // Check that the procedure exists
    expect(caller.saveGuide).toBeDefined();
  });

  it("should have listSavedGuides procedure", async () => {
    const ctx = createAuthContext();
    const caller = guidesRouter.createCaller(ctx);

    // Check that the procedure exists
    expect(caller.listSavedGuides).toBeDefined();
  });

  it("should have deleteSavedGuide procedure", async () => {
    const ctx = createAuthContext();
    const caller = guidesRouter.createCaller(ctx);

    // Check that the procedure exists
    expect(caller.deleteSavedGuide).toBeDefined();
  });
});
