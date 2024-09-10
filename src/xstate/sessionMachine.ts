import { ISession } from "@/interfaces";
import { assign, createActor, setup } from "xstate";

/**
 * Todo: Add guards for undeletable default session
 */

const sessionMachine = setup({
  types: {
    events: {} as
      | { type: "idle" }
      | { type: "menu" }
      | { type: "select"; session: ISession }
      | { type: "add"; session: ISession }
      | { type: "createSessionDialog" }
      | { type: "delete"; id: string },
    context: {} as {
      selectedSession: ISession | null;
      sessions: Record<string, ISession>;
    },
  },
}).createMachine({
  id: "session",
  initial: "idle",
  context: {
    selectedSession: null,
    sessions: {
      0: {
        id: "0",
        name: "default",
        type: "persistent",
      },
    },
  },
  states: {
    idle: {
      on: {
        menu: "menu",

        select: {
          target: "idle",
          reenter: true,
          actions: assign({
            selectedSession: ({ event }) => event.session,
          }),
        },
      },
    },

    menu: {
      on: {
        idle: {
          target: "idle",
          reenter: true,
        },

        select: {
          target: "idle",
          reenter: true,
          actions: assign({
            selectedSession: ({ event }) => event.session,
          }),
        },

        createSessionDialog: {
          target: "createSessionDialog",
        },
      },
    },

    createSessionDialog: {
      on: {
        idle: {
          target: "idle",
        },
      },
    },
  },

  on: {
    add: {
      actions: assign({
        sessions: ({ context, event }) => {
          return {
            ...context.sessions,
            [event.session.id]: {
              ...event.session,
            },
          };
        },
      }),
    },

    delete: {
      actions: assign({
        sessions: ({ context, event }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [event.id]: value, ...rest } = context.sessions;
          return rest;
        },
        selectedSession: ({ context }) => {
          const sessions = Object.values(context.sessions);
          return sessions[sessions.length - 1];
        },
      }),
    },
  },
});

const sessionActor = createActor(sessionMachine);

export { sessionActor };
