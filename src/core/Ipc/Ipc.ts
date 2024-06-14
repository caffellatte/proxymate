import type { Database as IDatabase } from "@/core";
import { proxyCreate, proxyList } from "./handlers";

class Ipc {
  public database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  public proxyCreate = proxyCreate(this);
  public proxyList = proxyList(this);
}

export default Ipc;
