import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
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
   * createLogs
   */
  createLogs: (callback: (value: ILogsRecord) => void): (() => void) => {
    const subscription = (_event: IpcRendererEvent, value: ILogsRecord) =>
      callback(value);
    ipcRenderer.on("create-logs", subscription);
    return () => {
      ipcRenderer.removeListener("create-logs", subscription);
    };
  },
  /**
   * updateLogs
   */
  updateLogs: (callback: (value: ILogsRecord) => void): (() => void) => {
    const subscription = (_event: IpcRendererEvent, value: ILogsRecord) =>
      callback(value);
    ipcRenderer.on("update-logs", subscription);
    return () => {
      ipcRenderer.removeListener("update-logs", subscription);
    };
  },
  /**
   * clearLogs
   */
  clearLogs: (proxyId: string) => ipcRenderer.invoke("logs:clear", proxyId),
});
