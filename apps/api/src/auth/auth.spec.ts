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

  it("should have google socialProvider configured", () => {
    expect(auth.options.socialProviders?.google).toBeDefined();
  });

  it("should have accountLinking enabled with google as trusted provider", () => {
    expect(auth.options.account?.accountLinking?.enabled).toBe(true);
    expect(auth.options.account?.accountLinking?.trustedProviders).toContain("google");
    expect(auth.options.account?.accountLinking?.requireLocalEmailVerified).toBe(false);
    expect(auth.options.account?.accountLinking?.updateUserInfoOnLink).toBe(true);
  });
});
