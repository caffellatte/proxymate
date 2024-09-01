import { createMachine, createActor } from "xstate";
const sessionMachine = createMachine({
  id: "session",
  initial: "idle",
  context: {},
  states: {
    idle: {
      on: {
        menu: "menu",
      },
    },

    menu: {
      on: {
        idle: {
          target: "idle",
          reenter: true,
        },
      },
    },
  },
});

const sessionActor = createActor(sessionMachine);

export { sessionActor };
