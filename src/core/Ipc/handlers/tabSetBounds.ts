import { Ipc } from "@/core";
import debug from "debug";
import { IViewSize } from "@/interfaces";
import { IpcMainInvokeEvent } from "electron";
const logger = debug("ipc:handlers:tabSetBounds");

interface ITabSetBoundsParams {
  event: IpcMainInvokeEvent;
  viewSize: IViewSize;
}

const tabSetBounds = (ipc: Ipc) => async (params: ITabSetBoundsParams) => {
  logger("viewSize", params.viewSize);
  return ipc.tabs.setBounds(params.viewSize);
};

export { tabSetBounds };
