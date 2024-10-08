import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";
import { ILogsRecord, IProxy, ISession, ITab, IViewSize } from "@/interfaces";

contextBridge.exposeInMainWorld("electronAPI", {
  /**
   *
   * MAIN WINDOW
   *
   */

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
  /**
   * clearLogs
   */
  logGetAll: (proxyId: string) => ipcRenderer.invoke("logs:getAll", proxyId),
  /**
   * serversGetIds
   */
  serversGetIds: () => ipcRenderer.invoke("servers:getIds"),

  /**
   *
   * BROWSER WINDOW
   *
   */
  /**
   * tabClose
   */
  tabClose: (id: number) => ipcRenderer.invoke("browser:tabClose", id),
  /**
   * tabCreate
   */
  tabCreate: () => ipcRenderer.invoke("browser:tabCreate"),
  /**
   * tabGo
   */
  tabGo: (tab: ITab) => ipcRenderer.invoke("browser:tabGo", tab),
  /**
   * tabSetBounds
   */
  tabSetBounds: (viewSize: IViewSize) =>
    ipcRenderer.invoke("browser:tabSetBounds", viewSize),
  /**
   * sessionCreate
   */
  sessionCreate: (session: Omit<ISession, "id">) =>
    ipcRenderer.invoke("browser:sessionCreate", session),
  /**
   * sessionCreate
   */
  sessionDelete: (id: string) =>
    ipcRenderer.invoke("browser:sessionDelete", id),
  /**
   * sessionGetAll
   */
  sessionGetAll: () => ipcRenderer.invoke("browser:sessionGetAll"),
  /**
   * browser:windowOpen,
   */
  windowOpen: (session: ISession) =>
    ipcRenderer.invoke("browser:windowOpen", session),
});
