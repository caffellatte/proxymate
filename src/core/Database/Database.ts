import { ClassicLevel } from "classic-level";
import {
  AnyJson,
  ILevelDatabase,
  IProxiesDatabase,
  ISessionsDatabase,
  IProxy,
  ISession,
} from "@/interfaces";
import { Proxies, Logs, Sessions } from "./sublevels";

/**
 * Todo: replace *Database with const
 */

class Database {
  private levelDatabase: ILevelDatabase;
  private logsDatabase: ILevelDatabase;
  private proxiesDatabase: IProxiesDatabase;
  private sessionsDatabase: ISessionsDatabase;
  public proxies: Proxies;
  public logs: Logs;
  public sessions: Sessions;

  constructor({
    databaseLocationPath,
    logsLocationPath,
    sessionssLocationPath,
  }: {
    databaseLocationPath: string;
    logsLocationPath: string;
    sessionssLocationPath: string;
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
    // Create a sessions database
    this.sessionsDatabase = new ClassicLevel<string, ISession>(
      sessionssLocationPath,
      {
        valueEncoding: "json",
      }
    );
    // Sessions class
    this.sessions = new Sessions(this.sessionsDatabase);
  }
}

export default Database;
