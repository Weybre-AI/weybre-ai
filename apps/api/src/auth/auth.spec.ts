jest.mock("better-auth", () => ({
  betterAuth: jest.fn((options) => ({
    options,
  })),
}));

jest.mock("better-auth/adapters/drizzle", () => ({
  drizzleAdapter: jest.fn(),
}));

import { auth } from "./auth";

describe("Better Auth Configuration", () => {
  it("should have emailAndPassword enabled and sendResetPassword configured", () => {
    expect(auth.options.emailAndPassword?.enabled).toBe(true);
    expect(typeof auth.options.emailAndPassword?.sendResetPassword).toBe("function");
  });
});
