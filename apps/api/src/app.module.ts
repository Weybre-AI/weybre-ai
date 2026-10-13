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
