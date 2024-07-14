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
    this.servers[id] = new ProxyChain.Server({
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

    this.servers[id].listen(() => {
      console.log(`Proxy server is listening on port ${this.servers[id].port}`);
    });

    // Emitted when HTTP connection is closed
    this.servers[id].on("connectionClosed", ({ connectionId, stats }) => {
      console.log(`Connection ${connectionId} closed`);
      console.dir(stats);
    });

    // Emitted when HTTP request fails
    this.servers[id].on("requestFailed", ({ request, error }) => {
      console.log(`Request ${request.url} failed`);
      console.error(error);
    });
  }

  public stop(id: string) {
    const server = this.servers[id];
    server.close(true, () => {
      console.log(`Proxy server ${id} was closed.`);
    });
    delete this.servers[id];
    console.log(this.servers);
  }
}

export default Chain;
