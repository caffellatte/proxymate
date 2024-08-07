import type { Database as IDatabase, Chain as IChain } from "@/core";
import {
  logClear,
  logCreate,
  logUpdate,
  proxyCreate,
  proxyDelete,
  proxyEdit,
  proxyGet,
  proxyList,
  proxyStart,
  proxyStop,
} from "./handlers";

class Ipc {
  public database: IDatabase;
  public chain: IChain;

  constructor({ database, chain }: { database: IDatabase; chain: IChain }) {
    this.database = database;
    this.chain = chain;
  }

  public logClear = logClear(this);
  public logCreate = logCreate(this);
  public logUpdate = logUpdate(this);
  public proxyCreate = proxyCreate(this);
  public proxyDelete = proxyDelete(this);
  public proxyEdit = proxyEdit(this);
  public proxyGet = proxyGet(this);
  public proxyList = proxyList(this);
  public proxyStart = proxyStart(this);
  public proxyStop = proxyStop(this);
}

export default Ipc;
