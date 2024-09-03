import { ISession } from "@/interfaces";
import { assign, createActor, setup } from "xstate";

const sessionMachine = setup({
  types: {
    events: {} as
      | { type: "idle" }
      | { type: "menu" }
      | { type: "select"; session: ISession }
      | { type: "create" },
    context: {} as {
      selectedSession: ISession | null;
    },
  },
}).createMachine({
  id: "session",
  initial: "idle",
  context: {
    selectedSession: null,
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

        create: {
          target: "create",
        },
      },
    },

    create: {
      on: {
        idle: {
          target: "idle",
        },
      },
    },
  },
});

const sessionActor = createActor(sessionMachine);

export { sessionActor };
