import { createMachine, ActorRefFrom, createActor, assign } from "xstate";
import { logMachine } from "./logMachine";

const logsMachine = createMachine({
  id: "logs",
  types: {} as {
    context: {
      logs: Record<string, ActorRefFrom<typeof logMachine>>;
    };
    events: {
      type: "init";
      proxyId: string;
    };
  },
  context: {
    logs: {},
  },
  on: {
    init: {
      actions: assign({
        logs: ({ context, event, spawn }) => {
          const logActor = spawn(logMachine, { id: `log-${event.proxyId}` });
          const logs = {
            ...context.logs,
            [event.proxyId]: logActor,
          };
          return logs;
        },
      }),
    },
  },
});

const logsActor = createActor(logsMachine);

export { logsMachine, logsActor };
