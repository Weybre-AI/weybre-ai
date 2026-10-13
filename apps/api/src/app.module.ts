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

@Module({
    imports: [
        ConfigModule.forRoot(),
        DatabaseModule,
        AuthModule.forRootAsync({
            useFactory: (database: NodePgDatabase) => ({
                auth: betterAuth({
                    database: drizzleAdapter(database, {
                        provider: 'pg',
                    }),
                    emailAndPassword: {
                        enabled: true,
                    },
                    trustedOrigins: [
                        process.env.BACKEND_PROT,
                        process.env.BACKEND_PORT,
                        process.env.FRONTEND_URL,
                    ].filter(Boolean) as string[],
                }),
            }),
            inject: [DATABASE_CONNECTION],
        }),
        UserModule
    ],
})

export class AppModule {}