import { Ipc } from "@/core";
import debug from "debug";
import { IpcMainInvokeEvent } from "electron";
import { ITab } from "@/interfaces";
const logger = debug("ipc:handlers:loadUrl");

interface ILogClearParams {
  event: IpcMainInvokeEvent;
  tab: ITab;
}

const loadUrl = (ipc: Ipc) => async (params: ILogClearParams) => {
  logger("tab:", params.tab);
  return await ipc.views.loadUrl(params.tab);
};

export { loadUrl };
