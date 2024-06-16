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
      Omit<IProxy, "id" | "state">
    >("proxies", {
      keyEncoding: "utf8",
      valueEncoding: "json",
    });
    // Proxies subclass
    this.proxies = new Proxies(this.proxiesDatabase);
  }
}

export default Database;
