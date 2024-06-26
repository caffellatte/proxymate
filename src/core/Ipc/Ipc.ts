import type { Database as IDatabase } from "@/core";
import {
  proxyCreate,
  proxyDelete,
  proxyEdit,
  proxyGet,
  proxyList,
} from "./handlers";

class Ipc {
  public database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  public proxyCreate = proxyCreate(this);
  public proxyDelete = proxyDelete(this);
  public proxyEdit = proxyEdit(this);
  public proxyGet = proxyGet(this);
  public proxyList = proxyList(this);
}

export default Ipc;
