import { assign, createActor, createMachine } from "xstate";

const uiMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFcCWA6VEA2YDEEYuALmANoAMAuoqAA4D2sqxqDAdrSAB6IC0AZgAsATnQAmCgICM4gKwAaEAE9E4oQDZ0AgOzSKOgByjZ+kUIC+FpWkw58AYwBOYAIalKNJCEbNWHLl4EQVF0OXFhXUUVRFkKdE0hYyirGwwsXDxIFk8uXxY2Tm8gjSEw6Wk9Qx1o1QRpDXF0HRENarlUkFtCEnxsVFhiXO98-yLQIL5JAXQKgXFDWVrEATkyoWk5YRF5oTWhAU7bZzdSPH7B4fomAoDi-nFpQ2bxcQ05RuX6sTkKaQEKJJDAIQaCjhhssRzgMhtQ8jcxoF+El0K0kgcako6tIfn8AUDQWDOuwGIR4N40PC-IUkcEhIDUXIdFIllj+BodKiRNUKH8-uIRHJueC7Lgqbdxjx+JsxDodJFMTEEJJpBI9DoNCCRAsmdJLNYuhgemBSOLEfdgqsyoLmTJ5GyEFaEpttrt9ocDccXO4wGaaRaQpzwgqvjiwnjARRgYSPWl0JC-XcJogUW1Fdjcf9I9HCVYrEA */
  id: "ui",
  initial: "idle",
  context: {
    proxyId: null as string | null,
  },
  states: {
    idle: {
      on: {
        delete: "delete",
        create: "create",
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
