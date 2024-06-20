import { NextFunction, Request, Response } from "express";
import { HTTPStatusCodes } from "../helpers/httpstatuscodes";

export function pathNotFoundMiddleware(req: Request, res: Response, next: NextFunction): void {
    res.status(HTTPStatusCodes.NotFound).send("404 not found.");
}