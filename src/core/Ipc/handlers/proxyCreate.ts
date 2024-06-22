import { Ipc } from "@/core";
import { IProxy } from "@/types";
import { IpcMainInvokeEvent } from "electron";

interface IProxyCreateParams {
  event: IpcMainInvokeEvent;
  proxy: Omit<IProxy, "id" | "state">;
}

const proxyCreate = (ipc: Ipc) => async (params: IProxyCreateParams) => {
  const { proxy } = params;
  const lastKey = await ipc.database.proxies.getLastKey();
  console.log("lastKey:", lastKey);
  console.log("typeof lastKey:", typeof lastKey);

  const key = lastKey ? (parseInt(lastKey, 10) + 1).toString() : "1";
  return await ipc.database.proxies.put(key, proxy);
};

export { proxyCreate };
