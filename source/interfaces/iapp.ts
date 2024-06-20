import { Connection } from "mysql2";
import { IController } from "./icontroller";
import { Server as httpserver } from "http"
import { Server as httpsserver } from "https"

export interface IApp {
    mountControllersRouters(controllers: Array<IController>): void;
    mountDatabase(database_connection: Connection): void;
    startHTTPServer(): void;
    startHTTPSServer(): void;
    setUpMiddlewares(): void;
    getServer(): httpserver | httpsserver | null;
    stopServer(): void;
}