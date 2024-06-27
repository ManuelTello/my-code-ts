import express, { Application, Router, json, urlencoded, static as express_static, IRouter } from "express";
import { IApp } from "../../interfaces/iapp";
import { IController } from "../../interfaces/icontroller";
import { Server as httpserver, createServer as createhttpServer } from "http";
import { Server as httpsserver, createServer as createhttpsServer } from "https";
import { authMiddleware } from "../../middlewares/authmiddleware";
import { pathNotFoundMiddleware } from "../../middlewares/notfoundmiddleware";
import { serverErrorMiddleware } from "../../middlewares/servererrormiddleware";
import { DataSource } from "typeorm";
import { DatabaseProvider } from "../database/database";
import { SessionController as ApiSession } from "../../controllers/api/sessioncontroller";
import { SessionController as ClientSession } from "../../controllers/client/sessioncontroller";
import { join } from "path"

class App implements IApp {
    private mainRouter: IRouter;
    private mainApp: Application;
    private mainServer: httpserver | httpsserver | null;
    private databaseConnection: DataSource | null;

    public constructor() {
        this.mainApp = express();
        this.mainRouter = Router();
        this.databaseConnection = null;
        this.mainServer = null;
    }

    public async mountControllersRouters(): Promise<void> {
        /*
            Here goes all the controllers
        */
        const api_controllers: Array<IController> = new Array<IController>(
            new ApiSession(this.databaseConnection!)
        );

        const client_controllers: Array<IController> = new Array<IController>(
            new ClientSession(this.databaseConnection!)
        );
        /*
            End of controllers section
        */

        const api_router: IRouter = Router();
        api_controllers.forEach((controller) => {
            const controller_router: IRouter = Router();
            controller.initializeRoutes(controller_router);
            api_router.use(controller.baseURL, controller_router);
        });

        const client_router: IRouter = Router();
        client_controllers.forEach((controller) => {
            const controller_router: IRouter = Router();
            controller.initializeRoutes(controller_router);
            client_router.use(controller.baseURL, controller_router);
        })

        this.mainApp.use("/api/v1", authMiddleware, api_router);
        this.mainApp.use(client_router);
        this.mainApp.use("*", pathNotFoundMiddleware);
        this.mainApp.use(serverErrorMiddleware);
    }

    public async mountDatabase(): Promise<void> {
        switch (process.env.NODE_ENV) {
            case "development":
                this.databaseConnection = await DatabaseProvider.provideDevelopmentConnection().initialize();
                break;
            case "test":
                this.databaseConnection = await DatabaseProvider.provideTestConnection().initialize();
                break;
            default:
                break;
        }
    }

    public async setUpMiddlewares(): Promise<void> {
        this.mainApp.use(express_static(join(process.cwd(), "www")));
        this.mainApp.set("view engine", "ejs");
        this.mainApp.set("views", join(process.cwd(), "source", "views"));
        this.mainApp.use(json());
        this.mainApp.use(urlencoded({ extended: true }));
    }

    public async startHTTPServer(): Promise<void> {
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

    public getApp(): Application {
        return this.mainApp;
    }

    public async stopServer(): Promise<void> {
        if (this.mainServer) {
            console.log("Stoping server");
            this.mainServer!.close();
        }
        console.log("Closing database connection");
        await this.databaseConnection?.destroy;
    }
}

export default App;