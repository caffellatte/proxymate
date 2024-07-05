import { Ipc } from "@/core";
import { IProxy } from "@/types";
import { IpcMainInvokeEvent } from "electron";
import debug from "debug";
const logger = debug("ipc:handlers:proxyCreate");
interface IProxyCreateParams {
  event: IpcMainInvokeEvent;
  proxy: Omit<IProxy, "id" | "state">;
}

const proxyCreate = (ipc: Ipc) => async (params: IProxyCreateParams) => {
  const { proxy } = params;
  const lastKey = await ipc.database.proxies.getLastKey();

  logger("lastKey:", lastKey, "typeof lastKey:", typeof lastKey);

  const key = lastKey ? (parseInt(lastKey, 10) + 1).toString() : "1";
  return await ipc.database.proxies.put(key, { id: Number(key), ...proxy });
};

export { proxyCreate };
