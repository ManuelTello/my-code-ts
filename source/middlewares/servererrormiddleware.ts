import { NextFunction, Request, Response } from "express";
import { HTTPStatusCodes } from "../helpers/httpstatuscodes";

export function serverErrorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
    res.status(HTTPStatusCodes.InternalServerError).send("500 internal server error.")
}