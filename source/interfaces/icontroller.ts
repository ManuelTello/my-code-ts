import { Router } from "express";

export interface IController {
    baseURL: string;
    initializeRoutes(root_router: Router): void;
}