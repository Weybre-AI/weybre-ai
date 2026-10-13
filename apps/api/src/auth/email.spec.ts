import { sendResetPasswordEmail } from "./email";
import { Resend } from "resend";

jest.mock("resend", () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn().mockResolvedValue({
          data: { id: "test-email-id-123" },
          error: null,
        }),
      },
    })),
  };
});

describe("sendResetPasswordEmail", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("should send email using RESEND_URL if provided", async () => {
    process.env.RESEND_URL = "re_test_key_12345";
    delete process.env.RESEND_API_KEY;

    await sendResetPasswordEmail({
      user: {
        email: "user@example.com",
        name: "Test User",
      },
      url: "http://localhost:3000/auth/reset-password?token=test-token",
      token: "test-token",
    });

    expect(Resend).toHaveBeenCalledWith("re_test_key_12345");
  });

  it("should throw error if no API key is defined", async () => {
    delete process.env.RESEND_URL;
    delete process.env.RESEND_API_KEY;

    await expect(
      sendResetPasswordEmail({
        user: { email: "user@example.com" },
        url: "http://localhost:3000/auth/reset-password",
        token: "tok",
      })
    ).rejects.toThrow("Resend API key is missing");
  });
});
