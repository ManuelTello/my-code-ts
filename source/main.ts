import App from "./providers/app/app";
import { createDatabaseConnection } from "./providers/database/database";

const app: App = new App();

app.setUpMiddlewares();
app.mountDatabase(createDatabaseConnection());
app.mountControllersRouters([]);
app.startHTTPServer();