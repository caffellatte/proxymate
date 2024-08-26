import type {
  Database as IDatabase,
  Chain as IChain,
  Views as IViews,
} from "@/core";
import {
  loadUrl,
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
  public views: IViews;

  constructor({
    database,
    chain,
    views,
  }: {
    database: IDatabase;
    chain: IChain;
    views: IViews;
  }) {
    this.database = database;
    this.chain = chain;
    this.views = views;
  }

  public loadUrl = loadUrl(this);
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
