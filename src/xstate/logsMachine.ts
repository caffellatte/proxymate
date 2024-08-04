import { createMachine, createActor, assign } from "xstate";

import { ILogsRecord } from "@/types";

const logsMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBsD2VYGIDGAnMAhgC5gDaADALqKgAOqsAlkY6gHY0gAeiAtAMwAWAJwA6AEwBGSYIAc5AGwBWJZIWzxAGhABPPuOWjZC4YLmzhwyf3KyAvne1oMmAK60IxMlU70mLdk4eBF4AdnDRfiUpciVlVXUtXT5QhVFyYRjVEWtbcQcndCxsZEJcCmokED9mVg4q4LDFUUsFBX4TWLUNbT0Q-hkW9slhWQsrG3sCkDZUCDhOZ3gqmoD60EalUNkJCwVY+O6kvt41SVElWUFxTIUcyfyHOyA */
  id: "logs",

  context: {
    logs: {},
  },

  types: {} as {
    context: {
      logs: Record<number, Omit<ILogsRecord, "proxyId" | "connectionId">>;
    };
    events:
      | {
          type: "create";
          newLog: Omit<ILogsRecord, "stats">;
        }
      | {
          type: "update";
          updatedLog: Omit<ILogsRecord, "url">;
        }
      | {
          type: "clear";
        };
  },

  on: {
    create: {
      actions: assign({
        logs: ({ context, event }) => {
          return {
            ...context.logs,
            [Number(event.newLog.connectionId)]: {
              stats: {
                srcTxBytes: 0,
                srcRxBytes: 0,
                trgTxBytes: 0,
                trgRxBytes: 0,
              },
              url: event.newLog.url,
            },
          };
        },
      }),
    },

    update: {
      actions: assign({
        logs: ({ context, event }) => {
          return {
            ...context.logs,
            [Number(event.updatedLog.connectionId)]: {
              stats: event.updatedLog.stats,
              url: context.logs[event.updatedLog.connectionId].url,
            },
          };
        },
      }),
    },

    clear: {
      actions: assign({
        logs: {},
      }),
    },
  },
});

const logsActor = createActor(logsMachine);

export { logsMachine, logsActor };
