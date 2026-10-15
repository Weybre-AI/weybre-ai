import { Global, Module } from "@nestjs/common";
import { DATABASE_CONNECTION } from "./database-connection";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as authSchema from "../auth/schema"
@Global()
@Module({
    imports: [ConfigModule],
    providers: [
        {
            provide: DATABASE_CONNECTION,
            useFactory: (configService: ConfigService) => {
                const pool = new Pool({
                    connectionString: configService.getOrThrow('DATABASE_URL'),
                    max: 10,
                    idleTimeoutMillis: 30000,
                    connectionTimeoutMillis: 10000,
                });
                pool.on('error', (err) => {
                    console.error('Unexpected error on idle database client', err);
                });
                return drizzle(pool, {
                    schema: {
                        ...authSchema,
                    },
                });
            },
            inject: [ConfigService],
        },
    ],
    exports: [DATABASE_CONNECTION],
})

export class DatabaseModule {}