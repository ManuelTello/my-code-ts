import "reflect-metadata";
import App from "./providers/app/app";

const app: App = new App();

(async function () {
    process.on("SIGINT", async () => {
        await app.stopServer();
        process.exit(1);
    })

    await app.mountDatabase();
    await app.setUpMiddlewares();
    await app.mountControllersRouters();
    await app.startHTTPServer();
}())
