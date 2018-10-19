import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";

let window: BrowserWindow | null = null;

app.on("ready", createWindow);
app.on("window-all-closed", onAllWindowsClosed);
app.on("activate", onActivate);

function createWindow() {
    window = new BrowserWindow({ width: 800, height: 800, icon: path.join(__dirname + "./static/images/icons/eco-icon.png") });
    window.loadURL(
        url.format({
        pathname: path.join(__dirname, "static/index.html"),
        protocol: "file:",
        slashes: true,
        }));
    window.webContents.openDevTools();
    window.on("closed", (): any => (window = null));
}

function onAllWindowsClosed() {
    if (process.platform !== "darwin") {
        app.quit();
  }
}

function onActivate() {
    if (window === null) {createWindow();
    }
}
