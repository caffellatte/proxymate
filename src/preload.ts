import { contextBridge, ipcRenderer } from "electron";
import { IProxy } from "@/types";

contextBridge.exposeInMainWorld("electronAPI", {
  proxyCreate: (proxy: Omit<IProxy, "id" | "state">) =>
    ipcRenderer.invoke("proxy:create", proxy),
});
