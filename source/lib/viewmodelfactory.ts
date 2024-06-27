import { BaseViewModel } from "../viewmodels/baseviewmodel";
import { SignInViewModel } from "../viewmodels/session/signinviewmodel";
import { SignUpViewModel } from "../viewmodels/session/signupviewmodel";

export class ViewModelFactory {
    public constructor() { }

    static sessionSignInViewModel(): BaseViewModel<SignInViewModel> {
        const view_bag: SignInViewModel = new SignInViewModel();
        const viewmodel: BaseViewModel<SignInViewModel> = new BaseViewModel<SignInViewModel>(view_bag, "Sign in", "session/signin.ejs");
        return viewmodel;
    }

    static sessionSignUpViewModel(): BaseViewModel<SignUpViewModel> {
        const view_bag: SignUpViewModel = new SignUpViewModel();
        const viewmodel: BaseViewModel<SignUpViewModel> = new BaseViewModel<SignUpViewModel>(view_bag, "Sign up", "session/signup.ejs");
        return viewmodel;
    }
}