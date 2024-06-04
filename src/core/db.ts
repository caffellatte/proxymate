import { app } from "electron";
import Dexie, { type EntityTable } from "dexie";
import { indexedDB, IDBKeyRange } from "fake-indexeddb";

import { IProxy } from "@/types";

const userData = app.getPath("userData");

console.log("userData:", userData);

const db = new Dexie("ProxiesDatabse", {
  indexedDB: indexedDB,
  IDBKeyRange: IDBKeyRange,
}) as Dexie & {
  proxies: EntityTable<IProxy, "id">;
};

db.version(1).stores({
  proxies: "++id, name",
});

db.open().catch(function (error) {
  console.error("ERROR: " + error);
});

export { db };
