import "reflect-metadata";
import App from "./providers/app/app";

const app: App = new App();

(async function () {
    await app.mountDatabase();
    app.setUpMiddlewares();
    app.mountControllersRouters();
    app.startHTTPServer();
}())
