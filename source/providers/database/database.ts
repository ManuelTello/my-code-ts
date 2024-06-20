import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/browser";
import { join } from "path";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions.js";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions.js";

export class DatabaseProvider {
    public constructor() { }

    static provideTestConnection(): DataSource {
        const connection_options: SqliteConnectionOptions = {
            type: "sqlite",
            database: join(process.cwd(), "tests", "test_db.db"),
        }
        const provider: DataSource = new DataSource(connection_options);
        return provider;
    }

    static provideDevelopmentConnection(): DataSource {
        const connection_options: MysqlConnectionOptions = {
            type: "mysql",
            host: process.env.DATABASE_HOST,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            port: parseInt(process.env.DATABASE_PORT!),
            database: process.env.DATABASE_SCHEMA
        }
        const provider: DataSource = new DataSource(connection_options);
        return provider;
    }
}