import { Ipc } from "@/core";
import { IpcMainInvokeEvent } from "electron";

interface IProxyDeleteParams {
  event: IpcMainInvokeEvent;
  id: string;
}

const proxyDelete = (ipc: Ipc) => async (params: IProxyDeleteParams) => {
  return await ipc.database.proxies.delete(params.id);
};

export { proxyDelete };
