import type {
  Database as IDatabase,
  Chain as IChain,
  Tabs as ITabs,
} from "@/core";
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
  tabClose,
  tabCreate,
  tabGo,
  tabSetBounds,
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
  public tabClose = tabClose(this);
  public tabCreate = tabCreate(this);
  public tabGo = tabGo(this);
  public tabSetBounds = tabSetBounds(this);
}

export default Ipc;
