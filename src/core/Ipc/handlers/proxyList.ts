import { Ipc } from "@/core";
import { IProxy } from "@/interfaces";
import { IpcMainInvokeEvent } from "electron";

interface IProxyListParams {
  event: IpcMainInvokeEvent;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const proxyList = (ipc: Ipc) => async (params: IProxyListParams) => {
  const data: [string, Omit<IProxy, "id">][] =
    await ipc.database.proxies.getAll();

  const proxies = data.map((entity) => {
    const [id, rest] = entity;
    const proxy: IProxy = {
      id: id,
      ...rest,
    };
    return proxy;
  });

  return proxies;
};

export { proxyList };
