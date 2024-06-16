import { Ipc } from "@/core";
import { IProxy } from "@/types";
import { IpcMainInvokeEvent } from "electron";

interface IProxyListParams {
  event: IpcMainInvokeEvent;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const proxyList = (ipc: Ipc) => async (params: IProxyListParams) => {
  const data: [string, Omit<IProxy, "id" | "state">][] =
    await ipc.database.proxies.getAll();

  const proxies = data.map((entity) => {
    const [id, rest] = entity;
    const proxy: Omit<IProxy, "state"> = {
      id: parseInt(id, 10),
      ...rest,
    };
    return proxy;
  });

  return proxies;
};

export { proxyList };
