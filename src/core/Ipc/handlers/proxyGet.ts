import { Ipc } from "@/core";
import { IpcMainInvokeEvent } from "electron";

interface IProxyGetParams {
  event: IpcMainInvokeEvent;
  id: string;
}

const proxyGet = (ipc: Ipc) => async (params: IProxyGetParams) => {
  return await ipc.database.proxies.get(params.id);
};

export { proxyGet };
