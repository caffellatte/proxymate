import { IProxyChainRequest, ILogsDatabase, ILevelDatabase } from "@/types";
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
    this.logsSublevels[proxyId] = this.logsDatabase.sublevel<
      string,
      Omit<IProxyChainRequest, "proxyId">
    >(proxyId, {
      keyEncoding: "utf8",
      valueEncoding: "json",
    });
    this.logs.push(proxyId);
    logger("this.logs:", this.logs);
  }

  put(proxyId: string, record: Omit<IProxyChainRequest, "proxyId">) {
    if (!this.logs.includes(proxyId)) this.init(proxyId);
    return new Promise((resolve, reject) => {
      this.logsSublevels[proxyId].put(record.id.toString(), record, (err) => {
        if (err) reject(err);
        resolve(record);
      });
    });
  }
}

export { Logs };
