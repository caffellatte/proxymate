import { Ipc } from "@/core";
import debug from "debug";
import { IpcMainInvokeEvent } from "electron";
const logger = debug("ipc:handlers:tabClose");

interface ITabCloseParams {
  event: IpcMainInvokeEvent;
  id: number;
}

const tabClose = (ipc: Ipc) => async (params: ITabCloseParams) => {
  logger("id", params.id);
  return await ipc.tabs.close(params.id);
};

export { tabClose };
