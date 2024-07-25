import { Ipc } from "@/core";
import debug from "debug";
import { IpcMainInvokeEvent } from "electron";
const logger = debug("ipc:handlers:logClear");

interface ILogClearParams {
  event: IpcMainInvokeEvent;
  proxyId: string;
}

const logClear = (ipc: Ipc) => async (params: ILogClearParams) => {
  logger("proxyId:", params.proxyId);
  return await ipc.database.logs.clear(params.proxyId);
};

export { logClear };
