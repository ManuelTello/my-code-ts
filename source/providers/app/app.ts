import express, { Application, Router, json, urlencoded } from "express";
import { IApp } from "../../interfaces/iapp";
import { IController } from "../../interfaces/icontroller";
import { Server as httpserver, createServer as createhttpServer } from "http";
import { Server as httpsserver, createServer as createhttpsServer } from "https";
import { Connection } from "mysql2";
import { authMiddleware } from "../../middlewares/authmiddleware";
import { pathNotFoundMiddleware } from "../../middlewares/notfoundmiddleware";
import { serverErrorMiddleware } from "../../middlewares/servererrormiddleware";

class App implements IApp {
    private mainRouter: Router;
    private mainApp: Application;
    private mainServer: httpserver | httpsserver | null;
    private databaseConnection: Connection | null;

    public constructor() {
        this.mainApp = express();
        this.mainRouter = Router();
        this.databaseConnection = null;
        this.mainServer = null;
    }

    public mountControllersRouters(controllers: Array<IController>): void {
        controllers.forEach((controller) => {
            const controller_router: Router = Router();
            controller.initializeRoutes(controller_router);
            this.mainRouter.use(controller.baseURL, controller_router);
        });
        this.mainApp.use("*", pathNotFoundMiddleware);
        this.mainRouter!.use(serverErrorMiddleware);
    }

    public mountDatabase(database_connection: Connection): void {
        this.databaseConnection = database_connection;
    }

    public setUpMiddlewares(): void {
        this.mainApp.use(json());
        this.mainApp.use(urlencoded({ extended: true }));
        this.mainRouter.use(authMiddleware);
        this.mainApp.use("/api/v1", this.mainRouter);
    }

    public startHTTPServer(): void {
        const server: httpserver = createhttpServer(this.mainApp).listen(8080, () => console.log("Server up"));
        this.mainServer = server;
    }

    public startHTTPSServer(): void {
        const server: httpsserver = createhttpsServer({}, this.mainApp).listen(8080, () => console.log("Server up"))
        this.mainServer = server;
    }

    public getServer(): httpserver | httpsserver | null {
        return this.mainServer;
    }

    public stopServer(): void {
        this.mainServer?.close();
    }
}

export default App;