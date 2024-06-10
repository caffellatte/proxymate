import { IProxy } from "@/types";

export interface IElectronAPI {
  proxyCreate: (
    proxy: Omit<IProxy, "id" | "state">,
  ) => Promise<Omit<IProxy, "id" | "state">>;
}

declare global {
  interface Window {
    electronAPI: IElectronAPI;
  }
}
