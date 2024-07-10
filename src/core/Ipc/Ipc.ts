import type { Database as IDatabase } from "@/core";
import type { Chain as IChain } from "@/core";
import {
  proxyCreate,
  proxyDelete,
  proxyEdit,
  proxyGet,
  proxyList,
} from "./handlers";

class Ipc {
  public database: IDatabase;
  public chain: IChain;

  constructor(database: IDatabase, chain: IChain) {
    this.database = database;
    this.chain = chain;
  }

  public proxyCreate = proxyCreate(this);
  public proxyDelete = proxyDelete(this);
  public proxyEdit = proxyEdit(this);
  public proxyGet = proxyGet(this);
  public proxyList = proxyList(this);
}

export default Ipc;
