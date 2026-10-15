import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as authSchema from "./schema";
import { sendResetPasswordEmail } from "./email";

export const auth = betterAuth({
    database: drizzleAdapter(
        {},
        {
            provider: 'pg',
            schema: authSchema,
        },
    ),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url, token }) => {
            await sendResetPasswordEmail({ user, url, token });
        },
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        },
    },
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google"],
            requireLocalEmailVerified: false,
            updateUserInfoOnLink: true,
        },
    },
    onAPIError: {
        errorURL: `${process.env.FRONTEND_URL || "http://localhost:3000"}/auth/error`,
    },
});
