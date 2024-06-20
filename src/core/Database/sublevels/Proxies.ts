import { IProxy, IProxiesDatabase } from "@/types";

class Proxies {
  private proxiesDatabase: IProxiesDatabase;

  constructor(proxiesDatabase: IProxiesDatabase) {
    this.proxiesDatabase = proxiesDatabase;
  }

  clear() {
    return new Promise((resolve, reject) => {
      this.proxiesDatabase.clear(null, (err) => {
        if (err) reject(err);
        resolve("ok");
      });
    });
  }

  create(id: string, proxy: Omit<IProxy, "id" | "state">) {
    return new Promise((resolve, reject) => {
      this.proxiesDatabase.put(id, proxy, (err) => {
        if (err) reject(err);
        resolve(proxy);
      });
    });
  }

  get(id: string) {
    return new Promise((resolve, reject) => {
      console.log("get -> id:", id);
      this.proxiesDatabase.get(id, (err, proxy) => {
        if (err) reject(err);
        resolve(proxy);
      });
    });
  }

  delete(id: string) {
    return new Promise((resolve, reject) => {
      this.proxiesDatabase.del(id, (err) => {
        if (err) reject(err);
        resolve(id);
      });
    });
  }

  async getLastKey() {
    for await (const key of this.proxiesDatabase.keys({
      reverse: true,
      limit: 1,
    })) {
      return key;
    }
  }

  async getAll() {
    return await this.proxiesDatabase.iterator().all();
  }
}

export { Proxies };
