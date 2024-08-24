import { Ipc } from "@/core";
import { IProxy } from "@/interfaces";
import { IpcMainInvokeEvent } from "electron";

interface IProxyEditParams {
  event: IpcMainInvokeEvent;
  proxy: IProxy;
}

const proxyStart = (ipc: Ipc) => async (params: IProxyEditParams) => {
  console.log("proxyStart", params);
  const { proxy } = params;
  return ipc.chain.start(proxy);
};

export { proxyStart };
