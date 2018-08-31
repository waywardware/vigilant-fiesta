const {app, BrowserWindow} = require("electron");

class Main {
    private window: typeof BrowserWindow;
    private application: typeof app;

    constructor(application: typeof app) {
        this.application = application;

        this.application.on("ready", this.createWindow);
        this.application.on("windows-all-closed", this.onAllWindowsClosed);
        this.application.on("activate", this.onActivate);
    }

    private createWindow() {
        this.window = new BrowserWindow({width: 800, height: 600});
        this.window.loadURL("file://" + __dirname + "/views/index.html");
        this.window.on("closed", () => this.window = null);
    }

    private onAllWindowsClosed() {
        if (process.platform !== "darwin") {
            this.application.quit();
        }
    }

    private onActivate() {
        if (this.window === null) {
            this.createWindow();
        }
    }
}

const main = new Main(app);
