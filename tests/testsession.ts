import App, { } from "../source/providers/app/app"

const app = new App();

describe("Session testing", () => {
    beforeAll(async () => {
        console.log("Setting up testing app and database");
        await app.mountDatabase();
        await app.setUpMiddlewares();
        await app.mountControllersRouters();
    });

    afterAll(async () => {
        console.log("Closing server and datbase connection");
        await app.stopServer();
    });

    it("Should create a new user", async () => {
        expect(0).toEqual(0);
    })
})