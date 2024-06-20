import { Connection, createConnection } from "mysql2";

export function createDatabaseConnection(): Connection {
    const database_connection: Connection = createConnection({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_SCHEMA
    })

    return database_connection;
}