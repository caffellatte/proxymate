import path from "path";
import { Ipc, Database, Chain } from "@/core";
import { app, ipcMain } from "electron";
import debug from "debug";
import { IProxyChainRequest } from "@/types";
import EventEmitter from "eventemitter3";
const logger = debug("core");

class Core {
  private chain: Chain;
  private database: Database;
  private ipc: Ipc;
  private eventBus: EventEmitter;

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

  public start() {
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
    this.eventBus.on("logs:init", (data) => {
      return this.ipc.logsInit(data as Omit<IProxyChainRequest, "stats">);
    });
  }
}

export default Core;
