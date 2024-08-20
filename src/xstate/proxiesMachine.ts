import {
  ActorRefFrom,
  createMachine,
  assign,
  stopChild,
  createActor,
} from "xstate";
import { proxyMachine } from "./proxyMachine";
import { IProxy } from "@/interfaces";
// import debug from "debug";

// debug.enable("*");

// const logger = debug("proxiesMachine");

const proxiesMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7AHgSzgYgEMIIBtABgF1EV1ZsAXbdAO2pE0QFoBGAZgDYAdACYAnABYA7KMm8BospICsADgA0IAJ6Juk4YNH9RK3uO6jhZfuIsBfWxrRZcsPKjABbdADcw5KkggyLQMTKyBHAjC3Pq8MQqiSrxkwsKSkupaXCpKIgJySmRmCvwq3PaOGDj4AK7IEAT0fpRswXSMLGyRnMImgooqg8nipSrGGtoIPPxCVoM2fGXC-MLi9g4gzOgQcK1VLq0hHeGgkWQTiGTrtkA */
  types: {} as {
    context: {
      proxies: ActorRefFrom<typeof proxyMachine>[];
    };
    events:
      | {
          type: "add";
          newProxy: IProxy;
        }
      | {
          type: "remove";
          id: string;
        }
      | {
          type: "update";
          editedProxy: IProxy;
        };
  },
  id: "proxies",
  context: {
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
                proxy_protocol: event.newProxy.proxy_protocol,
                proxy_host: event.newProxy.proxy_host,
                proxy_port: event.newProxy.proxy_port,
                authentication: {
                  authentication: event.newProxy.authentication.authentication,
                  username: event.newProxy.authentication.username,
                  password: event.newProxy.authentication.password,
                },
                created: event.newProxy.created,
                updated: event.newProxy.updated,
              },
            })
          ),
      }),
    },
    remove: {
      actions: [
        // Stop the proxy actor to unsubscribe
        ({ event }) => {
          stopChild(`proxy-${event.id}`);
        },
        // Remove the proxy from the list by index
        assign({
          proxies: ({ context, event }) =>
            context.proxies.filter((proxy) => proxy.id !== `proxy-${event.id}`),
        }),
      ],
    },
    update: {
      actions: [
        // Stop the proxy actor to unsubscribe
        ({ event }) => {
          stopChild(`proxy-${event.editedProxy.id}`);
        },
        // Remove the proxy from the list by index
        assign({
          proxies: ({ context, event }) =>
            context.proxies.filter(
              (proxy) => proxy.id !== `proxy-${event.editedProxy.id}`
            ),
        }),
        assign({
          proxies: ({ context, event, spawn }) =>
            context.proxies.concat(
              spawn(proxyMachine, {
                id: `proxy-${event.editedProxy.id}`,
                input: {
                  id: event.editedProxy.id.toString(),
                  name: event.editedProxy.name,
                  description: event.editedProxy.description,
                  port: event.editedProxy.port,
                  proxy_protocol: event.editedProxy.proxy_protocol,
                  proxy_host: event.editedProxy.proxy_host,
                  proxy_port: event.editedProxy.proxy_port,
                  authentication: {
                    authentication:
                      event.editedProxy.authentication.authentication,
                    username: event.editedProxy.authentication.username,
                    password: event.editedProxy.authentication.password,
                  },
                  created: event.editedProxy.created,
                  updated: event.editedProxy.updated,
                },
              })
            ),
        }),
      ],
    },
  },
});

const proxiesActor = createActor(proxiesMachine);

export { proxiesMachine, proxiesActor };
