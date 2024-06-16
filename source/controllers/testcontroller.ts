import { Request, Response, Router } from "express";
import { IController } from "../interfaces/icontroller";

export class TestController implements IController {
    public readonly baseURL: string;

    public constructor() {
        this.baseURL = "/test";
    }

    initializeRoutes(root_router: Router): void {
        root_router.get("/test", this.testFunction.bind(this));
    }

    public testFunction(req: Request, res: Response): void {
        res.status(200).json({ test: "hola" });
    }
}