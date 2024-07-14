import { assign, createActor, createMachine } from "xstate";

const uiMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFcCWA6VEA2YDEAxgE5gCGALmANoAMAuoqAA4D2sq5qLAdoyAB6IAtAGYALAE50AVgBM4kQHZpAGhABPRAEZZNdGIBsYgBxil0gL4W1aTDnwQwuSrQZIQrdpx59BCUZLouiI6qhqIsoboSlo0iqYSOrESYlY2GFi4eJAcrnyeHFy87n5GMlpailrGymqaCFoGsuiKEgY1ltYgto7O+NiosOR57gXexaB+QsHoFSKyxqF1iCLSYvpa0uIS82JrZmndGMRklHgDQyPMbIU+JcKy1S2ysgbSTWH1WlLSNFoiNF0xhEINBh1sOXI50Gw3o+Ru418whM6DaJjMtXCDR+fwBQNBYMO3BYjng7jQ8K8RSR-jEgNR0kUNBCsk+wgMilREmMBh2+wMq2Z4Iy9kptwmAmEmykikUCkx9V0WiCVUUApEEgWjK0qS6PScYEoYsR938q3WEkZzKWWPNGy2kl2+xEwvQJwoYGN1NNAU5cnlbOxMlxgJowIJLr1GEhXruk0QKPaCu0OP+ofDBKsViAA */
  id: "ui",
  initial: "idle",
  context: {
    proxyId: null as string | null,
    logId: null as string | null,
  },
  states: {
    idle: {
      on: {
        log: {
          actions: assign({
            logId: ({ event }) => event.logId,
          }),
        },

        create: "create",

        delete: {
          target: "delete",
          actions: assign({
            proxyId: ({ event }) => event.proxyId,
          }),
        },

        edit: {
          target: "edit",
          actions: assign({
            proxyId: ({ event }) => event.proxyId,
          }),
        },
      },
    },

    delete: {
      on: {
        list: {
          target: "idle",
          actions: assign({
            proxyId: null,
          }),
          reenter: true,
        },
      },
    },

    create: {
      on: {
        list: {
          target: "idle",
          reenter: true,
        },
      },
    },

    edit: {
      on: {
        list: {
          target: "idle",
          actions: assign({
            proxyId: null,
          }),
          reenter: true,
        },
      },
    },
  },
});

const uiActor = createActor(uiMachine);

export { uiActor };
