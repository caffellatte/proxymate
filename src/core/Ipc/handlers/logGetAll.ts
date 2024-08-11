import { Ipc } from "@/core";
import debug from "debug";
import { IpcMainInvokeEvent } from "electron";
const logger = debug("ipc:handlers:logGetAll");

interface ILogGetAllParams {
  event: IpcMainInvokeEvent;
  proxyId: string;
}
const logGetAll = (ipc: Ipc) => async (params: ILogGetAllParams) => {
  const { proxyId } = params;
  logger("proxyId:", proxyId);
  return await ipc.database.logs.getAll(proxyId);
};

export { logGetAll };
