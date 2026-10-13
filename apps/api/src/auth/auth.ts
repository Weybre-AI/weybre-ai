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
});
