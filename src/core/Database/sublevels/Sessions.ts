import { ISession, ISessionsDatabase } from "@/interfaces";
import debug from "debug";
const logger = debug("levels:sessions");

class Sessions {
  private sessionsDatabase: ISessionsDatabase;

  constructor(sessionsDatabase: ISessionsDatabase) {
    this.sessionsDatabase = sessionsDatabase;
  }

  clear() {
    return new Promise((resolve, reject) => {
      this.sessionsDatabase.clear({}, (err) => {
        if (err) reject(err);
        resolve("ok");
      });
    });
  }

  put(id: string, session: ISession) {
    return new Promise((resolve, reject) => {
      this.sessionsDatabase.put(id, session, (err) => {
        if (err) reject(err);
        resolve(session);
      });
    });
  }

  get(id: string) {
    return new Promise((resolve, reject) => {
      logger("get -> id:", id);
      this.sessionsDatabase.get(id, (err, proxy) => {
        if (err) reject(err);
        resolve(proxy);
      });
    });
  }

  delete(id: string) {
    return new Promise((resolve, reject) => {
      this.sessionsDatabase.del(id, (err) => {
        if (err) reject(err);
        resolve(id);
      });
    });
  }

  async getLastKey() {
    for await (const key of this.sessionsDatabase.keys({
      reverse: true,
      limit: 1,
    })) {
      return key;
    }
  }

  async getAll() {
    return await this.sessionsDatabase.iterator().all();
  }
}

export { Sessions };
