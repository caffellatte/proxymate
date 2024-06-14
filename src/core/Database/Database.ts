import { ClassicLevel } from "classic-level";
import { AnyJson, ILevelDatabase, IProxiesDatabase, IProxy } from "@/types";
import { Proxies } from "./sublevels";

class Database {
  private levelDatabase: ILevelDatabase;
  private proxiesDatabase: IProxiesDatabase;
  public proxies: Proxies;

  constructor(databaseLocationPath: string) {
    // Create a level database
    this.levelDatabase = new ClassicLevel<string, AnyJson>(
      databaseLocationPath,
      {
        valueEncoding: "json",
      },
    );
    // Create proxy sublevel database
    this.proxiesDatabase = this.levelDatabase.sublevel<
      string,
      Omit<IProxy, "state">[]
    >("proxies", {
      valueEncoding: "json",
    });
    // Proxies subclass
    this.proxies = new Proxies(this.proxiesDatabase);
  }
}

// async function testDb(db: ClassicLevel) {
//   // Add an entry with key 'a' and value 1
//   await db.put("a", "1");

//   // Add multiple entries
//   await db.batch([{ type: "put", key: "b", value: "2" }]);

//   // Get value of key 'a': 1
//   const value = await db.get("a");
//   console.log(value);

//   // Iterate entries with keys that are greater than 'a'
//   for await (const [key, value] of db.iterator({ gt: "a" })) {
//     console.log(key); // 2
//     console.log(value); // 2
//   }
// }

export default Database;
