import { IProxy } from "./types";

export interface IElectronAPI {
  proxyCreate: (
    proxy: Omit<IProxy, "id" | "state">,
  ) => Promise<Omit<IProxy, "id" | "state">>;

  proxyList: () => Promise<Omit<IProxy, "state">[]>;

  proxyDelete: (id: string) => Promise<string>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
