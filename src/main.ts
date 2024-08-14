import path from "path";
import debug from "debug";
import { app, BrowserWindow } from "electron";
import Core from "@/core";

debug.enable("*");
const logger = debug("main");
const core = new Core();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  core.setMainWindow(mainWindow);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

const createBrowserWindow = () => {
  // Create the browser window.
  const browserWindow = new BrowserWindow({
    width: 1280,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (BROWSER_WINDOW_VITE_DEV_SERVER_URL) {
    browserWindow.loadURL(BROWSER_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    browserWindow.loadFile(
      path.join(__dirname, `../browser/${BROWSER_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  browserWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();
  createBrowserWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  core.start();
  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

app.on("before-quit", (event) => {
  logger("Caught before-quit...");
  event.preventDefault();

  const serverIds = core.chain.getServerIds();

  logger("serverIds:", serverIds);

  const stopServers = serverIds.map((server) => {
    return new Promise((resolve) => {
      core.chain.stop(server);
      resolve(server);
    });
  });

  Promise.all(stopServers);
  process.exit(0);
});
