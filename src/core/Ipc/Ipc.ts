import type { Database as IDatabase, Chain as IChain } from "@/core";
import {
  logClear,
  logCreate,
  logGetAll,
  logUpdate,
  proxyCreate,
  proxyDelete,
  proxyEdit,
  proxyGet,
  proxyList,
  proxyStart,
  proxyStop,
  serversGetIds,
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
  public logGetAll = logGetAll(this);
  public logUpdate = logUpdate(this);
  public proxyCreate = proxyCreate(this);
  public proxyDelete = proxyDelete(this);
  public proxyEdit = proxyEdit(this);
  public proxyGet = proxyGet(this);
  public proxyList = proxyList(this);
  public proxyStart = proxyStart(this);
  public proxyStop = proxyStop(this);
  public serversGetIds = serversGetIds(this);
}

export default Ipc;
