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
   * proxyEdit
   */
  proxyEdit: (id: string, proxy: Omit<IProxy, "id" | "state">) =>
    ipcRenderer.invoke("proxy:edit", id, proxy),
  /**
   *
   * proxyGet
   */
  proxyGet: (id: string) => ipcRenderer.invoke("proxy:get", id),
  /**
   * proxyList
   */
  proxyList: () => ipcRenderer.invoke("proxy:list"),

  proxyStart: (proxy: IProxy) => ipcRenderer.invoke("proxy:start", proxy),
});
