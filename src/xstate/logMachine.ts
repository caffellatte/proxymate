import { createMachine, createActor, assign } from "xstate";

import { ILogsRecord } from "@/interfaces";

const logMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBsD2VYGIDGAnMAhgC5gDaADALqKgAOqsAlkY6gHY0gAeiAtAMwAWAJwA6AEwBGSYIAc5AGwBWJZIWzxAGhABPPuOWjZC4YLmzhwyf3KyAvne1oMmAK60IxMlU70mLdk4eBF4AdnDRfiUpciVlVXUtXT5QhVFyYRjVEWtbcQcndCxsZEJcCmokED9mVg4q4LDFUUsFBX4TWLUNbT0Q-hkW9slhWQsrG3sCkDZUCDhOZ3gqmoD60EalUNkJCwVY+O6kvt41SVElWUFxTIUcyfyHOyA */
  id: "log",

  context: {
    log: {},
  },

  types: {} as {
    context: {
      log: Record<number, Omit<ILogsRecord, "proxyId" | "connectionId">>;
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
          type: "add";
          log: ILogsRecord;
        }
      | {
          type: "clear";
        };
  },

  on: {
    create: {
      actions: assign({
        log: ({ context, event }) => {
          return {
            ...context.log,
            [Number(event.newLog.connectionId)]: {
              stats: {
                srcTxBytes: 0,
                srcRxBytes: 0,
                trgTxBytes: 0,
                trgRxBytes: 0,
              },
              url: event.newLog.url,
              created: event.newLog.created,
              updated: event.newLog.updated,
            },
          };
        },
      }),
    },

    update: {
      actions: assign({
        log: ({ context, event }) => {
          return {
            ...context.log,
            [Number(event.updatedLog.connectionId)]: {
              stats: event.updatedLog.stats,
              url: context.log[event.updatedLog.connectionId].url,
              created: context.log[event.updatedLog.connectionId].created,
              updated: event.updatedLog.updated,
            },
          };
        },
      }),
    },

    add: {
      actions: assign({
        log: ({ context, event }) => {
          return {
            ...context.log,
            [Number(event.log.connectionId)]: {
              stats: event.log.stats,
              url: event.log.url,
              created: event.log.created,
              updated: event.log.updated,
            },
          };
        },
      }),
    },

    clear: {
      actions: assign({
        log: {},
      }),
    },
  },
});

const logActor = createActor(logMachine);

export { logMachine, logActor };
