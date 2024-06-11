import { IProxy } from "@/types";
import { IpcMainInvokeEvent } from "electron";

export async function proxyCreate(
  _event: IpcMainInvokeEvent,
  proxy: Omit<IProxy, "id" | "state">,
) {
  return proxy;
}
