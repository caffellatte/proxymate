import { ClassicLevel } from "classic-level";
import { AnyJson, ILevelDatabase, IProxiesDatabase, IProxy } from "@/types";
import { Proxies, Logs } from "./sublevels";

class Database {
  private levelDatabase: ILevelDatabase;
  private logsDatabase: ILevelDatabase;
  private proxiesDatabase: IProxiesDatabase;
  public proxies: Proxies;
  public logs: Logs;

  constructor({
    databaseLocationPath,
    logsLocationPath,
  }: {
    databaseLocationPath: string;
    logsLocationPath: string;
  }) {
    // Create a level database
    this.levelDatabase = new ClassicLevel<string, AnyJson>(
      databaseLocationPath,
      {
        valueEncoding: "json",
      }
    );
    // Create proxy sublevel database
    this.proxiesDatabase = this.levelDatabase.sublevel<
      string,
      Omit<IProxy, "id">
    >("proxies", {
      keyEncoding: "utf8",
      valueEncoding: "json",
    });
    // Proxies subclass
    this.proxies = new Proxies(this.proxiesDatabase);
    // Create a logs database
    this.logsDatabase = new ClassicLevel<string, AnyJson>(logsLocationPath, {
      valueEncoding: "json",
    });
    this.logs = new Logs(this.logsDatabase);
  }
}

export default Database;
