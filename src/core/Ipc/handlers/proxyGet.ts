import { Ipc } from "@/core";
import { IpcMainInvokeEvent } from "electron";

interface IProxyGetParams {
  event: IpcMainInvokeEvent;
  id: string;
  // create(proxy: Omit<IProxy, "id" | "state">): Promise<unknown>; // Promise<Omit<IProxy, "id" | "state">>;
}

const proxyGet = (ipc: Ipc) => async (params: IProxyGetParams) => {
  const proxy = await ipc.database.proxies.get(params.id);
  return proxy;
};

export { proxyGet };
