import { ISession } from "@/interfaces";
import { assign, createActor, setup } from "xstate";

const sessionMachine = setup({
  types: {
    events: {} as
      | { type: "idle" }
      | { type: "menu" }
      | { type: "select"; session: ISession }
      | { type: "add"; session: ISession }
      | { type: "createSessionDialog" },
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
    sessions: {},
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
  },
});

const sessionActor = createActor(sessionMachine);

export { sessionActor };
