import express, { Application, Router, json, urlencoded } from "express";
import { IApp } from "../../interfaces/iapp";
import { IController } from "../../interfaces/icontroller";
import { Server } from "http";

class App implements IApp {
    private mainRouter: Router;
    private mainApp: Application;


    public constructor() {
        this.mainRouter = Router();
        this.mainApp = express();
    }

    public mountRouter(controllers: Array<IController>): void {
        controllers.forEach((controller) => {
            const controller_router: Router = Router();
            controller.initializeRoutes(controller_router);
            this.mainRouter.use(controller.baseURL, controller_router);
        });
    }

    public mountDatabase(): void {

    }

    public setUpMiddlewares(): void {
        this.mainApp.use(json());
        this.mainApp.use(urlencoded({ extended: true }));
        this.mainApp.use("/api/v1", this.mainRouter);
    }

    public startServer(): void {
        const output: Server = this.mainApp.listen(8080);
    }
}

export default App;