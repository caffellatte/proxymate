import { Ipc } from "@/core";
import debug from "debug";
import { ILogsRecord } from "@/interfaces";
const logger = debug("ipc:handlers:logCreate");

/**
 *  Maybe should be renamed to `logUrl.ts`
 */

const logCreate =
  (ipc: Ipc) => async (data: Omit<ILogsRecord, "stats" | "updated">) => {
    const { proxyId } = data;
    logger(data);
    return await ipc.database.logs.create(proxyId, data);
  };

export { logCreate };
