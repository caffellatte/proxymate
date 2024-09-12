import type {
  Database as IDatabase,
  Chain as IChain,
  Tabs as ITabs,
  Windows as IWindows,
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
  sessionCreate,
  sessionDelete,
  sessionGetAll,
  tabClose,
  tabCreate,
  tabGo,
  tabSetBounds,
  windowOpen,
} from "./handlers";

class Ipc {
  public database: IDatabase;
  public chain: IChain;
  public tabs: ITabs;
  public windows: IWindows;

  constructor({
    database,
    chain,
    tabs,
    windows,
  }: {
    database: IDatabase;
    chain: IChain;
    tabs: ITabs;
    windows: IWindows;
  }) {
    this.database = database;
    this.chain = chain;
    this.tabs = tabs;
    this.windows = windows;
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
  public sessionCreate = sessionCreate(this);
  public sessionDelete = sessionDelete(this);
  public sessionGetAll = sessionGetAll(this);
  public tabClose = tabClose(this);
  public tabCreate = tabCreate(this);
  public tabGo = tabGo(this);
  public tabSetBounds = tabSetBounds(this);
  public windowOpen = windowOpen(this);
}

export default Ipc;
