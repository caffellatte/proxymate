import { Ipc } from "@/core";
import debug from "debug";
import { ISession } from "@/interfaces";
import { IpcMainInvokeEvent } from "electron";
const logger = debug("ipc:handlers:sessionCreate");

interface ISessionCreateParams {
  event: IpcMainInvokeEvent;
  session: Omit<ISession, "id">;
}

const sessionCreate = (ipc: Ipc) => async (params: ISessionCreateParams) => {
  const { session } = params;
  const lastKey = await ipc.database.sessions.getLastKey();

  logger("lastKey:", lastKey, "typeof lastKey:", typeof lastKey);

  const key = lastKey ? (parseInt(lastKey, 10) + 1).toString() : "1";
  return await ipc.database.sessions.put(key, { id: key, ...session });
};

export { sessionCreate };
