import { Ipc } from "@/core";
import debug from "debug";
import { IpcMainInvokeEvent } from "electron";
const logger = debug("ipc:handlers:logGetAll");

interface ISessionGetAllParams {
  event: IpcMainInvokeEvent;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sessionGetAll = (ipc: Ipc) => async (params: ISessionGetAllParams) => {
  logger("sessionGetAll");
  return await ipc.database.sessions.getAll();
};

export { sessionGetAll };
