import { Ipc } from "@/core";
import debug from "debug";
import { ILogsRecord } from "@/types";
const logger = debug("ipc:handlers:logUpdate");

/**
 *  Maybe should be renamed to `logStats.ts`
 */

const logUpdate =
  (ipc: Ipc) =>
  async (data: Omit<ILogsRecord, "url">): Promise<ILogsRecord> => {
    const { proxyId } = data;
    logger(data);
    return await ipc.database.logs.update(proxyId, data);
  };

export { logUpdate };
