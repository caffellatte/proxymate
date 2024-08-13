import { Ipc } from "@/core";
import { IpcMainInvokeEvent } from "electron";

interface IServersGetIdsParams {
  event: IpcMainInvokeEvent;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const serversGetIds = (ipc: Ipc) => async (params: IServersGetIdsParams) => {
  return ipc.chain.getServerIds();
};

export { serversGetIds };
