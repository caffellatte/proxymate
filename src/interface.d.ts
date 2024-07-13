import { IProxy } from "./types";

export interface IElectronAPI {
  proxyCreate: (proxy: Omit<IProxy, "id">) => Promise<IProxy>;

  proxyDelete: (id: string) => Promise<string>;

  proxyEdit: (
    id: string,
    proxy: Omit<IProxy, "id">
  ) => Promise<Omit<IProxy, "id">>;

  proxyGet: (id: string) => Promise<Omit<IProxy, "id">>;

  proxyList: () => Promise<IProxy[]>;

  proxyStart: (proxy: IProxy) => void;

  proxyStop: (id: string) => void;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
