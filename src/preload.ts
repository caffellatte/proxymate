import { contextBridge, ipcRenderer } from "electron";
import { IProxy } from "@/types";

contextBridge.exposeInMainWorld("electronAPI", {
  /**
   * proxyCreate
   */
  proxyCreate: (proxy: Omit<IProxy, "id" | "state">) =>
    ipcRenderer.invoke("proxy:create", proxy),
  /**
   * proxyDelete
   */
  proxyDelete: (id: string) => ipcRenderer.invoke("proxy:delete", id),
  /**
   *
   * proxyGet
   */
  proxyGet: (id: string) => ipcRenderer.invoke("proxy:get", id),
  /**
   * proxyList
   */
  proxyList: () => ipcRenderer.invoke("proxy:list"),
});
