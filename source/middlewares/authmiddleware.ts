import { NextFunction, Request, Response } from "express";
import { HTTPStatusCodes } from "../helpers/httpstatuscodes";
import "dotenv/config";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const auth_header: string | undefined = req.headers.authorization;
    const a: string = `ApiKey ${process.env.API_KEY}`;
    if (auth_header && auth_header == `ApiKey ${process.env.API_KEY}`) {
        next();
    } else {
        res.status(HTTPStatusCodes.Unauthorized).send("401 unauthorized")
    }
}