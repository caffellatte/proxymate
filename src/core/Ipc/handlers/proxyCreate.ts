import { Ipc } from "@/core";
import { IProxy } from "@/types";
import { IpcMainInvokeEvent } from "electron";

interface IProxyCreateParams {
  event: IpcMainInvokeEvent;
  proxy: Omit<IProxy, "id" | "state">;
  // create(proxy: Omit<IProxy, "id" | "state">): Promise<unknown>; // Promise<Omit<IProxy, "id" | "state">>;
}

const proxyCreate = (ipc: Ipc) => async (params: IProxyCreateParams) => {
  let key = "1";
  const lastKey = await ipc.database.proxies.getLastKey();
  console.log("lastKey:", lastKey);

  if (lastKey) {
    key = (parseInt(lastKey, 10) + 1).toString();
  }
  const testProxy = await ipc.database.proxies.create(key, params.proxy);
  console.log(testProxy);
  return testProxy;
};

export { proxyCreate };
