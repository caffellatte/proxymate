import { IProxy } from "./types";

export interface IElectronAPI {
  proxyCreate: (
    proxy: Omit<IProxy, "id" | "state">
  ) => Promise<Omit<IProxy, "id" | "state">>;

  proxyDelete: (id: string) => Promise<string>;

  proxyEdit: (
    id: string,
    proxy: Omit<IProxy, "id" | "state">
  ) => Promise<Omit<IProxy, "id" | "state">>;

  proxyGet: (id: string) => Promise<Omit<IProxy, "id" | "state">>;

  proxyList: () => Promise<Omit<IProxy, "state">[]>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
