import { NextFunction, Request, Response, Router } from "express";
import { IController } from "../../interfaces/icontroller";
import { DataSource } from "typeorm";
import { SessionService } from "../../services/sessionservice";

export class SessionController implements IController {
    public baseURL: string;
    private service: SessionService;

    public constructor(database_connection: DataSource) {
        this.baseURL = "/session"
        this.service = new SessionService(database_connection);
    }

    initializeRoutes(root_router: Router): void {
        root_router.post("/signup", this.signUpSession.bind(this));
        root_router.post("/signin", this.signInSession.bind(this));
    }

    public async signUpSession(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, username, password } = req.body;
            const date_created: Date = new Date(parseInt(req.body.date_created));
            await this.service.addUserDetails(email, date_created, username, password);
            res.status(200);
        } catch (err: any) {
            next(err);
        }
    }

    public async signInSession(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

        } catch (err: any) {
            next(err);
        }
    }
}