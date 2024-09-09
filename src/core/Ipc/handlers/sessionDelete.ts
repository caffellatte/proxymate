import { Ipc } from "@/core";
import debug from "debug";
import { IpcMainInvokeEvent } from "electron";
const logger = debug("ipc:handlers:sessionCreate");

interface ISessionDeleteParams {
  event: IpcMainInvokeEvent;
  id: string;
}

const sessionDelete = (ipc: Ipc) => async (params: ISessionDeleteParams) => {
  const { id } = params;
  logger("sessionDelete:", id);
  return await ipc.database.sessions.delete(id);
};

export { sessionDelete };
