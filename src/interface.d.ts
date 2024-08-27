import { IProxy, ITab } from "./types";

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}

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

  createLogs: (callback: (value: ILogsRecord) => void) => () => void;

  updateLogs: (callback: (value: ILogsRecord) => void) => () => void;

  clearLogs: (proxyId: string) => Promise<string>;

  logGetAll: (
    proxyId: string
  ) => Promise<[string, Omit<ILogsRecord, "proxyId" | "connectionId">][]>;

  serversGetIds: () => Promise<string[]>;

  tabGo: (tab: ITab) => void;

  tabCreate: (tab: ITab) => Promise<Omit<ITab, "url">>;
}
