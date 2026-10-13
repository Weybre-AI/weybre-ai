import { Resend } from "resend";

interface SendResetPasswordEmailParams {
  user: {
    email: string;
    name?: string | null;
  };
  url: string;
  token: string;
}

export async function sendResetPasswordEmail({
  user,
  url,
}: SendResetPasswordEmailParams): Promise<void> {
  const apiKey = process.env.RESEND_URL || process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error(
      "[Resend] Neither RESEND_URL nor RESEND_API_KEY is defined in environment variables."
    );
    throw new Error("Resend API key is missing. Please check your environment configuration.");
  }

  const resend = new Resend(apiKey);
  const from = process.env.EMAIL_FROM || "Weybre AI <onboarding@resend.dev>";
  const displayName = user.name || "there";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Password</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 40px 20px;">
  <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);">
    <div style="background-color: #18181b; padding: 24px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.025em;">Weybre AI</h1>
    </div>
    <div style="padding: 32px 32px 40px;">
      <h2 style="color: #18181b; font-size: 20px; font-weight: 600; margin-top: 0; margin-bottom: 16px;">Password Reset Request</h2>
      <p style="color: #52525b; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
        Hi ${displayName},
      </p>
      <p style="color: #52525b; font-size: 15px; line-height: 1.6; margin-bottom: 28px;">
        We received a request to reset the password for your account. Click the button below to choose a new password:
      </p>
      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${url}" target="_blank" style="display: inline-block; background-color: #2563eb; color: #ffffff; font-size: 15px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 8px; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);">Reset Password</a>
      </div>
      <p style="color: #71717a; font-size: 13px; line-height: 1.5; margin-bottom: 16px;">
        If the button above does not work, copy and paste this link into your browser:
      </p>
      <p style="color: #2563eb; font-size: 13px; line-height: 1.5; word-break: break-all; margin-bottom: 28px;">
        <a href="${url}" style="color: #2563eb; text-decoration: underline;">${url}</a>
      </p>
      <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 28px 0;" />
      <p style="color: #a1a1aa; font-size: 12px; line-height: 1.5; margin: 0;">
        This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
      </p>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
Hi ${displayName},

We received a request to reset the password for your account. Click or visit the link below to choose a new password:

${url}

This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
  `.trim();

  const { data, error } = await resend.emails.send({
    from,
    to: user.email,
    subject: "Reset your password - Weybre AI",
    html,
    text,
  });

  if (error) {
    console.error("[Resend] Failed to send password reset email:", error);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }

  console.log(`[Resend] Password reset email sent successfully to ${user.email} (Email ID: ${data?.id})`);
}
