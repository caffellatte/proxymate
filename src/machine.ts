import { createMachine, createActor } from "xstate";

const toggleMachine = createMachine({
  id: "toggle",
  initial: "Inactive",
  states: {
    Inactive: {
      on: { toggle: "Active" },
    },
    Active: {
      on: { toggle: "Inactive" },
    },
  },
});

const actor = createActor(toggleMachine);

export { actor };
