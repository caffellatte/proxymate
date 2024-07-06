import { Ipc } from "@/core";
import { IProxy } from "@/types";
import { IpcMainInvokeEvent } from "electron";

interface IProxyEditParams {
  event: IpcMainInvokeEvent;
  id: string;
  proxy: Omit<IProxy, "id" | "state">;
}

const proxyEdit = (ipc: Ipc) => async (params: IProxyEditParams) => {
  const { id, proxy } = params;
  return await ipc.database.proxies.put(id, { id: id, ...proxy });
};

export { proxyEdit };
