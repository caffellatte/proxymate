import { app } from "electron";
// import Dexie, { type EntityTable } from "dexie";
// import { indexedDB, IDBKeyRange } from "fake-indexeddb";

// import { IProxy } from "@/types";

import path from "path";
const userData = app.getPath("userData");

console.log("userData:", userData);

import { ClassicLevel } from "classic-level";

// Create a database
export const db = new ClassicLevel(path.join(userData, "./db"), {
  valueEncoding: "json",
});

export async function testDb(db: ClassicLevel) {
  // Add an entry with key 'a' and value 1
  await db.put("a", "1");

  // Add multiple entries
  await db.batch([{ type: "put", key: "b", value: "2" }]);

  // Get value of key 'a': 1
  const value = await db.get("a");
  console.log(value);

  // Iterate entries with keys that are greater than 'a'
  for await (const [key, value] of db.iterator({ gt: "a" })) {
    console.log(key); // 2
    console.log(value); // 2
  }
}

// const db = new Dexie("ProxiesDatabse", {
//   indexedDB: indexedDB,
//   IDBKeyRange: IDBKeyRange,
// }) as Dexie & {
//   proxies: EntityTable<IProxy, "id">;
// };

// db.version(1).stores({
//   proxies: "++id, name",
// });

// db.open().catch(function (error) {
//   console.error("ERROR: " + error);
// });

// export { db };
