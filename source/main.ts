import { TestController } from "./controllers/testcontroller";
import App from "./providers/app/app";

const app: App = new App();
app.setUpMiddlewares();
app.mountDatabase();
app.mountRouter([new TestController()]);
app.startServer();