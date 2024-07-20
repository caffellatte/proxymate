import { ILogsRecord, ILogsDatabase, ILevelDatabase } from "@/types";
import debug from "debug";
const logger = debug("sublevels:logs");

class Logs {
  private logsDatabase: ILevelDatabase;
  private logsSublevels: Record<string, ILogsDatabase> = {};
  private logs: string[] = [];

  constructor(logsDatabase: ILevelDatabase) {
    this.logsDatabase = logsDatabase;
  }

  init(proxyId: string) {
    if (this.logs.includes(proxyId)) {
      logger("proxyId already in ", this.logs);
      return;
    }
    this.logsSublevels[proxyId] = this.logsDatabase.sublevel<
      string,
      Omit<ILogsRecord, "proxyId" | "connectionId">
    >(proxyId, {
      keyEncoding: "utf8",
      valueEncoding: "json",
    });
    this.logs.push(proxyId);
    logger(`Add: ${proxyId} in ${this.logs}`);
  }

  create(proxyId: string, log: Omit<ILogsRecord, "proxyId">) {
    if (!this.logs.includes(proxyId)) this.init(proxyId);
    return new Promise((resolve, reject) => {
      const { connectionId, ...rest } = log;
      this.logsSublevels[proxyId].put(connectionId.toString(), rest, (err) => {
        if (err) reject(err);
        const savedLog: ILogsRecord = {
          proxyId: proxyId,
          connectionId: connectionId,
          ...rest,
        };
        resolve(savedLog);
      });
    });
  }
}

export { Logs };
