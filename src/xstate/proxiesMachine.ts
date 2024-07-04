import {
  ActorRefFrom,
  createMachine,
  assign,
  stopChild,
  createActor,
} from "xstate";
import { proxyMachine } from "./proxyMachine";
import { IProxy } from "@/types";
import debug from "debug";

debug.enable("*");

const logger = debug("proxiesMachine");

const proxiesMachine = createMachine({
  types: {} as {
    context: {
      newProxy: Omit<IProxy, "state"> | null;
      proxies: ActorRefFrom<typeof proxyMachine>[];
    };
    events:
      | {
          type: "add";
          newProxy: Omit<IProxy, "state">;
        }
      | {
          type: "remove";
          id: string;
        };
  },
  id: "friends",
  context: {
    newProxy: null,
    proxies: [],
  },
  on: {
    add: {
      actions: assign({
        proxies: ({ context, event, spawn }) =>
          context.proxies.concat(
            spawn(proxyMachine, {
              id: `proxy-${event.newProxy.id}`,
              input: {
                id: event.newProxy.id.toString(),
                name: event.newProxy.name,
                description: event.newProxy.description,
                port: event.newProxy.port,
                proxy_host: event.newProxy.proxy_host,
                proxy_port: event.newProxy.proxy_port,
                authentication: {
                  authentication: event.newProxy.authentication.authentication,
                  username: event.newProxy.authentication.username,
                  password: event.newProxy.authentication.password,
                },
              },
            })
          ),
        newProxy: null,
      }),
    },
    remove: {
      actions: [
        // Stop the friend actor to unsubscribe
        stopChild(({ context, event }) => {
          return context.proxies.find(
            (proxy) => proxy.id === `proxy-${event.id}`
          );
        }),
        // Remove the friend from the list by index
        assign({
          proxies: ({ context, event }) =>
            context.proxies.filter((proxy) => proxy.id !== `proxy-${event.id}`),
        }),
      ],
    },
  },
});

const proxiesActor = createActor(proxiesMachine);

export { proxiesMachine, proxiesActor };
