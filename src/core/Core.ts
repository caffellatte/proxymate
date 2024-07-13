import path from "path";
import { Ipc, Database, Chain } from "@/core";
import { app, ipcMain } from "electron";

class Core {
  private chain: Chain;
  private databse: Database;
  private ipc: Ipc;
  private databaseLocationPath: string;

  constructor() {
    this.chain = new Chain();
    this.databaseLocationPath = path.join(app.getPath("userData"), "db");
    this.databse = new Database(this.databaseLocationPath);
    this.ipc = new Ipc(this.databse, this.chain);
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
  }
}

export default Core;
