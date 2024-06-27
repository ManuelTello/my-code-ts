import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";
import { User } from "../../models/user";
import { Role } from "../../models/role";
import { UserDetails } from "../../models/userdetails";

export class DatabaseProvider {
    public constructor() { }

    static provideTestConnection(): DataSource {
        const connection_options: DataSourceOptions = {
            type: "sqlite",
            database: join(process.cwd(), "tests", "test_db.db"),
            entities: [User, Role, UserDetails],
            synchronize: true,
            dropSchema: true
        }
        const provider: DataSource = new DataSource(connection_options);
        return provider;
    }

    static provideDevelopmentConnection(): DataSource {
        const connection_options: DataSourceOptions = {
            type: "mysql",
            host: process.env.DATABASE_HOST,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            port: parseInt(process.env.DATABASE_PORT!),
            database: process.env.DATABASE_SCHEMA,
            synchronize: true,
            entities: [User, Role, UserDetails],
            dropSchema: true
        }
        const provider: DataSource = new DataSource(connection_options);
        return provider;
    }
}