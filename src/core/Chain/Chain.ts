import ProxyChain, { Server } from "proxy-chain";
import { IProxy } from "@/types";

class Chain {
  private proxies: Server[];

  public start(proxy: IProxy) {
    const {
      port,
      proxy_protocol,
      proxy_host,
      proxy_port,
      authentication: { authentication, username, password },
    } = proxy;
    const server = new ProxyChain.Server({
      port: port,
      host: "localhost",
      verbose: true,

      prepareRequestFunction: () => {
        return {
          upstreamProxyUrl: authentication
            ? `${proxy_protocol}://${username}:${password}@${proxy_host}:${proxy_port}`
            : `${proxy_protocol}://${proxy_host}:${proxy_port}`,
        };
      },
    });

    server.listen(() => {
      console.log(`Proxy server is listening on port ${server.port}`);
    });

    // Emitted when HTTP connection is closed
    server.on("connectionClosed", ({ connectionId, stats }) => {
      console.log(`Connection ${connectionId} closed`);
      console.dir(stats);
    });

    // Emitted when HTTP request fails
    server.on("requestFailed", ({ request, error }) => {
      console.log(`Request ${request.url} failed`);
      console.error(error);
    });

    this.proxies.push(server);
  }
}

export default Chain;
