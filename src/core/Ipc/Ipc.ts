import type {
  Database as IDatabase,
  Chain as IChain,
  Tabs as ITabs,
} from "@/core";
import {
  tabCreate,
  tabGo,
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
  public tabs: ITabs;

  constructor({
    database,
    chain,
    tabs,
  }: {
    database: IDatabase;
    chain: IChain;
    tabs: ITabs;
  }) {
    this.database = database;
    this.chain = chain;
    this.tabs = tabs;
  }

  public tabCreate = tabCreate(this);
  public tabGo = tabGo(this);
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
