import { IProxy } from "./types";

export interface IElectronAPI {
  proxyCreate: (
    proxy: Omit<IProxy, "id" | "state">
  ) => Promise<Omit<IProxy, "id" | "state">>;

  proxyDelete: (id: string) => Promise<string>;

  proxyGet: (id: string) => Promise<Omit<IProxy, "id" | "state">>;

  proxyList: () => Promise<Omit<IProxy, "state">[]>;

  proxyUpdate: (
    id: string,
    proxy: Omit<IProxy, "id" | "state">
  ) => Promise<Omit<IProxy, "id" | "state">>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
