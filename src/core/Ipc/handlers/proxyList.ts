import { Ipc } from "@/core";
import { IProxy } from "@/types";
import { IpcMainInvokeEvent } from "electron";

interface IProxyListParams {
  event: IpcMainInvokeEvent;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const proxyList = (ipc: Ipc) => async (params: IProxyListParams) => {
  const proxies: Omit<IProxy, "id">[] = await ipc.database.proxies.getAll();
  console.log(proxies);

  return proxies;
};

export { proxyList };
