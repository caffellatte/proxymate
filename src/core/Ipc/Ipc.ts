import type { Database as IDatabase, Chain as IChain } from "@/core";
import {
  proxyCreate,
  proxyDelete,
  proxyEdit,
  proxyGet,
  proxyList,
  proxyStart,
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
  public proxyStart = proxyStart(this);
}

export default Ipc;
