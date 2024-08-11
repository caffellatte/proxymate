import { createMachine, ActorRefFrom, createActor, assign } from "xstate";
import { logMachine } from "./logMachine";

const logsMachine = createMachine({
  id: "logs",
  // initial: 'initialState',
  // states: {
  //   initialState: {},
  // }
  types: {} as {
    context: {
      logs: Record<string, ActorRefFrom<typeof logMachine>>;
      timestamp: number;
    };
    events: {
      type: "init";
      proxyId: string;
    };
  },
  context: {
    logs: {},
    timestamp: Date.now(),
  },
  on: {
    init: {
      actions: assign({
        logs: ({ context, event, spawn }) => {
          console.log("event.proxyId:", event.proxyId);
          const logActor = spawn(logMachine, { id: `log-${event.proxyId}` });
          console.log("logActor:", logActor);
          const _logsContext = {
            ...context.logs,
            [event.proxyId]: logActor,
          };
          console.log("_logsContext:", _logsContext);
          return _logsContext;
        },
      }),
    },
  },
});

const logsActor = createActor(logsMachine);

export { logsMachine, logsActor };
