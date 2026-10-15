import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthGuard, AuthModule } from "@thallesp/nestjs-better-auth";
import { DatabaseModule } from "./database/database.modules";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { DATABASE_CONNECTION } from "./database/database-connection";
import { UserModule } from "./users/users.module";
import { APP_GUARD } from "@nestjs/core";
import * as authSchema from "./auth/schema";
import { sendResetPasswordEmail } from "./auth/email";

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        AuthModule.forRootAsync({
            useFactory: (database: NodePgDatabase) => ({
                auth: betterAuth({
                    database: drizzleAdapter(database, {
                        provider: 'pg',
                        schema: authSchema,
                    }),
                    emailAndPassword: {
                        enabled: true,
                        sendResetPassword: async ({ user, url, token }) => {
                            await sendResetPasswordEmail({ user, url, token });
                        },
                    },
                    socialProviders: {
                        google: {
                            clientId: process.env.GOOGLE_CLIENT_ID || "443016074545-l956oqi3lhbddehfps9bab9r3843du2e.apps.googleusercontent.com",
                            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
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
                    trustedOrigins: [
                        process.env.BACKEND_PROT,
                        process.env.BACKEND_PORT,
                        process.env.FRONTEND_URL,
                        process.env.BETTER_AUTH_URL,
                        "http://localhost:3000",
                    ].filter(Boolean) as string[],
                }),
            }),
            inject: [DATABASE_CONNECTION],
        }),
        UserModule
    ],
})

export class AppModule {}
