import { IProxy } from "@/types";
import { IpcMainInvokeEvent } from "electron";
import type { default as IDatabase } from "@/core/db";

interface IProxyCreateParams {
  event: IpcMainInvokeEvent;
  proxy: Omit<IProxy, "id" | "state">;
  // create(proxy: Omit<IProxy, "id" | "state">): Promise<unknown>; // Promise<Omit<IProxy, "id" | "state">>;
}

class Ipc {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async proxyCreate(params: IProxyCreateParams) {
    const testProxy = await this.database.proxies.create(params.proxy);
    console.log(testProxy);
    return testProxy;
  }
}

export { Ipc };
