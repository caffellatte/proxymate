import ProxyChain, { Server } from "proxy-chain";
import { IProxy } from "@/types";

class Chain {
  private servers: Record<string, Server> = {};

  public start(proxy: IProxy) {
    const {
      id,
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

    this.servers[id] = server;
  }

  public stop(id: string) {
    /**
     * TODO (1): stop server
     */
    /**
     * TODO (2): remove server from servers
     */
    console.log(id);
    console.log(this.servers);
    console.log(this.servers[id]);
  }
}

export default Chain;
