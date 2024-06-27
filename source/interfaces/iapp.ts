import { Application } from "express";
import { Server as httpserver } from "http"
import { Server as httpsserver } from "https"

export interface IApp {
    mountControllersRouters(): void;
    mountDatabase(): void;
    startHTTPServer(): void;
    startHTTPSServer(): void;
    setUpMiddlewares(): void;
    getServer(): httpserver | httpsserver | null;
    getApp(): Application;
    stopServer(): void;
}