import type { Database as IDatabase } from "@/core";
import { proxyCreate } from "./handlers";

class Ipc {
  public database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  public proxyCreate = proxyCreate(this);
}

export default Ipc;
