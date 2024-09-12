import { Ipc } from "@/core";
import debug from "debug";
import { ISession } from "@/interfaces";
import { IpcMainInvokeEvent } from "electron";
const logger = debug("ipc:handlers:windowOpen");

interface IWindowOpenParams {
  event: IpcMainInvokeEvent;
  session: ISession;
}

const windowOpen = (ipc: Ipc) => async (params: IWindowOpenParams) => {
  const { session } = params;
  logger("session:", session);

  return await ipc.windows.open(session);
};

export { windowOpen };
