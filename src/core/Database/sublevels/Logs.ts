import { ILogsRecord, ILogsDatabase, ILevelDatabase } from "@/interfaces";
import debug from "debug";

const logger = debug("sublevels:logs");

class Logs {
  private logsDatabase: ILevelDatabase;
  private logsSublevels: Record<string, ILogsDatabase> = {};
  private logs: string[] = [];

  constructor(logsDatabase: ILevelDatabase) {
    this.logsDatabase = logsDatabase;
  }

  clear(proxyId: string) {
    if (!this.logsSublevels[proxyId]) this.init(proxyId);
    return new Promise((resolve, reject) => {
      this.logsSublevels[proxyId].clear({}, (err) => {
        if (err) reject(err);
        resolve("ok");
      });
    });
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

  create(
    proxyId: string,
    log: Omit<ILogsRecord, "proxyId" | "stats" | "updated">
  ) {
    if (!this.logs.includes(proxyId)) this.init(proxyId);
    return new Promise((resolve, reject) => {
      const { connectionId } = log;
      const data: Omit<ILogsRecord, "proxyId"> = {
        ...log,
        stats: {
          srcTxBytes: 0,
          srcRxBytes: 0,
          trgTxBytes: 0,
          trgRxBytes: 0,
        },
        updated: 0,
      };
      this.logsSublevels[proxyId].put(connectionId.toString(), data, (err) => {
        if (err) reject(err);
        const createdLog: ILogsRecord = {
          proxyId: proxyId,
          ...data,
        };
        resolve(createdLog);
      });
    });
  }

  update(
    proxyId: string,
    log: Omit<ILogsRecord, "proxyId" | "url" | "created">
  ): Promise<ILogsRecord> {
    if (!this.logs.includes(proxyId)) this.init(proxyId);
    return new Promise((resolve, reject) => {
      const { connectionId } = log;
      this.logsSublevels[proxyId].get(
        connectionId.toString(),
        (err, result) => {
          if (err) reject(err);
          const data: Omit<ILogsRecord, "proxyId"> = {
            ...log,
            url: result?.url ?? "",
            created: result?.created ?? 0,
          };
          this.logsSublevels[proxyId].put(
            connectionId.toString(),
            data,
            (err) => {
              if (err) reject(err);
              const updatedLog: ILogsRecord = {
                proxyId: proxyId,
                ...data,
              };
              resolve(updatedLog);
            }
          );
        }
      );
    });
  }

  async getAll(proxyId: string) {
    if (!this.logs.includes(proxyId)) this.init(proxyId);
    return await this.logsSublevels[proxyId].iterator().all();
  }
}

export { Logs };
