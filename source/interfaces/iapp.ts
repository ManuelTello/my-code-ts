import { IController } from "./icontroller";

export interface IApp {
    mountRouter(controllers: Array<IController>): void;
    mountDatabase(): void;
    startServer(): void;
    setUpMiddlewares(): void;
}