import { ActorRefFrom, createMachine, assign, stopChild } from "xstate";
import { proxyMachine } from "./proxyMachine";
import { IProxy } from "@/types";

const makeId = () => Math.random().toString(36).substring(7);

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
          index: number;
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
        stopChild(({ context, event }) => context.proxies[event.index]),
        // Remove the friend from the list by index
        assign({
          proxies: ({ context, event }) =>
            context.proxies.filter((_, index) => index !== event.index),
        }),
      ],
    },
  },
});

export { proxiesMachine };
