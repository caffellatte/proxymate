import { Ipc } from "@/core";
import { IpcMainInvokeEvent } from "electron";

interface IProxyEditParams {
  event: IpcMainInvokeEvent;
  id: string;
}

const proxyStop = (ipc: Ipc) => async (params: IProxyEditParams) => {
  console.log("proxyStart", params);
  const { id } = params;
  return ipc.chain.stop(id);
};

export { proxyStop };
