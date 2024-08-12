import path from "path";
import { Ipc, Database, Chain } from "@/core";
import { app, ipcMain, BrowserWindow } from "electron";
import debug from "debug";
import { ILogsRecord } from "@/types";
import EventEmitter from "eventemitter3";
const logger = debug("core");

class Core {
  public chain: Chain;
  private database: Database;
  private ipc: Ipc;
  private eventBus: EventEmitter;
  public mainWindow: BrowserWindow;

  constructor() {
    this.eventBus = new EventEmitter();
    this.chain = new Chain({ eventBus: this.eventBus });
    const databaseLocationPath = path.join(app.getPath("userData"), "db");
    const logsLocationPath = path.join(app.getPath("userData"), "logs");
    this.database = new Database({
      databaseLocationPath: databaseLocationPath,
      logsLocationPath: logsLocationPath,
    });
    this.ipc = new Ipc({
      database: this.database,
      chain: this.chain,
    });
  }

  public setMainWindow(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  private clearLogs() {
    this.database.proxies.getAll().then((data) => {
      data.forEach((entity) => {
        logger("clear:", entity[0].toString());
        this.database.logs.clear(entity[0].toString());
      });
    });
  }

  public start() {
    logger("CORE START");
    this.clearLogs();
    ipcMain.handle("proxy:create", (event, ...args) => {
      return this.ipc.proxyCreate({
        event: event,
        proxy: args[0],
      });
    });
    ipcMain.handle("proxy:delete", (event, ...args) => {
      return this.ipc.proxyDelete({
        event: event,
        id: args[0],
      });
    });
    ipcMain.handle("proxy:edit", (event, ...args) => {
      return this.ipc.proxyEdit({
        event: event,
        id: args[0],
        proxy: args[1],
      });
    });
    ipcMain.handle("proxy:get", (event, ...args) => {
      return this.ipc.proxyGet({
        event: event,
        id: args[0],
      });
    });
    ipcMain.handle("proxy:list", (event) => {
      return this.ipc.proxyList({
        event: event,
      });
    });
    ipcMain.handle("proxy:start", (event, ...args) => {
      return this.ipc.proxyStart({
        event: event,
        proxy: args[0],
      });
    });
    ipcMain.handle("proxy:stop", (event, ...args) => {
      return this.ipc.proxyStop({
        event: event,
        id: args[0],
      });
    });
    this.eventBus.on("logs:create", async (data) => {
      const record = await this.ipc.logCreate(
        data as Omit<ILogsRecord, "stats" | "updated">
      );
      logger(record);
      this.mainWindow.webContents.send("create-logs", record);
      return record;
    });
    this.eventBus.on("logs:update", async (data) => {
      if (data.stats) {
        const record = await this.ipc.logUpdate(
          data as Omit<ILogsRecord, "url" | "created">
        );
        logger(record);
        this.mainWindow.webContents.send("update-logs", record);
        return record;
      }
    });
    ipcMain.handle("logs:clear", (event, ...args) => {
      return this.ipc.logClear({
        event: event,
        proxyId: args[0],
      });
    });
    ipcMain.handle("logs:getAll", (event, ...args) => {
      return this.ipc.logGetAll({
        event: event,
        proxyId: args[0],
      });
    });
  }
}

export default Core;
