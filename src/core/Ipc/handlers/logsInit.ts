import { Ipc } from "@/core";
import debug from "debug";
import { IProxyChainRequest } from "@/types";
const logger = debug("ipc:handlers:logsInit");

interface ILogsInitParams {
  proxyId: string;
  connectionId: number;
  url: string;
}

const logsInit =
  (ipc: Ipc) => async (data: Omit<IProxyChainRequest, "stats">) => {
    logger(data);
    // return await ipc.database.proxies.put(key, { id: key, ...proxy });
  };

export { logsInit };
