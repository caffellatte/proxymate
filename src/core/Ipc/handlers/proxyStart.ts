import { Ipc } from "@/core";
import { IProxy } from "@/types";
import { IpcMainInvokeEvent } from "electron";

interface IProxyEditParams {
  event: IpcMainInvokeEvent;
  id: string;
  proxy: IProxy;
}

const proxyStart = (ipc: Ipc) => async (params: IProxyEditParams) => {
  const { proxy } = params;
  return ipc.chain.start(proxy);
};

export { proxyStart };
