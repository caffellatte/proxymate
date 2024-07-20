import { Ipc } from "@/core";
import debug from "debug";
import { ILogsRecord } from "@/types";
const logger = debug("ipc:handlers:logsInit");

const logCreate = (ipc: Ipc) => async (data: Omit<ILogsRecord, "stats">) => {
  const { proxyId } = data;
  logger(data);
  return await ipc.database.logs.create(proxyId, data);
};

export { logCreate };
