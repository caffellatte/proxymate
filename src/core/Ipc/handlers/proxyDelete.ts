import { Ipc } from "@/core";
import { IpcMainInvokeEvent } from "electron";

interface IProxyDeleteParams {
  event: IpcMainInvokeEvent;
  id: string;
  // create(proxy: Omit<IProxy, "id" | "state">): Promise<unknown>; // Promise<Omit<IProxy, "id" | "state">>;
}

const proxyDelete = (ipc: Ipc) => async (params: IProxyDeleteParams) => {
  const id = await ipc.database.proxies.delete(params.id);
  return id;
};

export { proxyDelete };
