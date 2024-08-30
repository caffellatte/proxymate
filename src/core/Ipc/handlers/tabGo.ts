import { Ipc } from "@/core";
import debug from "debug";
import { IpcMainInvokeEvent } from "electron";
import { ITab } from "@/interfaces";
const logger = debug("ipc:handlers:tabGo");

interface ITabGoParams {
  event: IpcMainInvokeEvent;
  tab: ITab;
}

const tabGo = (ipc: Ipc) => async (params: ITabGoParams) => {
  logger("tab:", params.tab);
  return await ipc.tabs.go(params.tab);
};

export { tabGo };
