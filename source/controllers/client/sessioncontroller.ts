import { NextFunction, Request, Response, Router } from "express";
import { IController } from "../../interfaces/icontroller";
import { DataSource } from "typeorm";
import { SessionService } from "../../services/sessionservice";
import { HTTPStatusCodes } from "../../helpers/httpstatuscodes";
import { SignInViewModel } from "../../viewmodels/session/signinviewmodel";
import { BaseViewModel } from "../../viewmodels/baseviewmodel";
import { ViewModelFactory } from "../../lib/viewmodelfactory";

export class SessionController implements IController {
    public baseURL: string;
    private service: SessionService;

    public constructor(database_connection: DataSource) {
        this.baseURL = "/session"
        this.service = new SessionService(database_connection);
    }

    initializeRoutes(root_router: Router): void {
        root_router.get("/signup", this.signUpSessionTemplate.bind(this));
        root_router.get("/signin", this.signInSessionTemplate.bind(this));
    }

    public async signUpSessionTemplate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

        } catch (err: any) {
            next(err);
        }
    }

    public async signInSessionTemplate(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const viewmodel: BaseViewModel<SignInViewModel> = ViewModelFactory.sessionSignInViewModel();
            res.status(HTTPStatusCodes.OK).render("base.ejs", { ...viewmodel });
        } catch (err: any) {
            next(err);
        }
    }
}