import { ISession } from "@/interfaces";
import { BrowserWindow } from "electron";
import debug from "debug";
import path from "path";

const logger = debug("windows");

class Windows {
  public open(session: ISession) {
    logger("session:", session);
    const browserWindow = new BrowserWindow({
      width: 1280,
      height: 960,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
      },
    });

    // core.setBrowserWindow(browserWindow);

    // and load the index.html of the app.
    if (BROWSER_WINDOW_VITE_DEV_SERVER_URL) {
      browserWindow.loadURL(BROWSER_WINDOW_VITE_DEV_SERVER_URL);
    } else {
      browserWindow.loadFile(
        path.join(
          __dirname,
          `../browser/${BROWSER_WINDOW_VITE_NAME}/index.html`
        )
      );
    }

    // Open the DevTools.
    browserWindow.webContents.openDevTools();
  }
}

export default Windows;
