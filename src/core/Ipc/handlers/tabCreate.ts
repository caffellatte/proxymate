import { Ipc } from "@/core";
import debug from "debug";
import { IpcMainInvokeEvent } from "electron";
import { ITab } from "@/interfaces";
const logger = debug("ipc:handlers:loadUrl");

interface ITabOpenParams {
  event: IpcMainInvokeEvent;
  tab: ITab;
}

const tabCreate = (ipc: Ipc) => async (params: ITabOpenParams) => {
  logger("tab:", params.tab);
  return await ipc.tabs.create(params.tab);
};

export { tabCreate };
