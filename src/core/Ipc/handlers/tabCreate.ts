import { Ipc } from "@/core";
import debug from "debug";
import { IpcMainInvokeEvent } from "electron";
const logger = debug("ipc:handlers:tabCreate");

interface ITabOpenParams {
  event: IpcMainInvokeEvent;
}

const tabCreate = (ipc: Ipc) => async (params: ITabOpenParams) => {
  logger("params.event", params.event);
  return await ipc.tabs.create();
};

export { tabCreate };
