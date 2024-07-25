import { contextBridge, ipcRenderer } from "electron";
import { IProxy, ILogsRecord } from "@/types";

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
  /**
   * proxyStart
   */
  proxyStart: (proxy: IProxy) => ipcRenderer.invoke("proxy:start", proxy),
  /**
   * proxyStop
   */
  proxyStop: (id: string) => ipcRenderer.invoke("proxy:stop", id),
  /**
   * updateLogs
   */
  updateLogs: (callback: (value: ILogsRecord) => void) =>
    ipcRenderer.on("update-logs", (_event, value) => callback(value)),
  /**
   * clearLogs
   */
  clearLogs: (proxyId: string) => ipcRenderer.invoke("logs:clear", proxyId),
});
