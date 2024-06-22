import path from "path";
import { Ipc, Database } from "@/core";
import { app, ipcMain } from "electron";

class Core {
  private databse: Database;
  private ipc: Ipc;
  private databaseLocationPath: string;

  constructor() {
    this.databaseLocationPath = path.join(app.getPath("userData"), "db");
    this.databse = new Database(this.databaseLocationPath);
    this.ipc = new Ipc(this.databse);
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
  }
}

export default Core;
