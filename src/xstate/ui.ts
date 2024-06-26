import { createMachine, createActor } from "xstate";
const uiMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFcCWA6VEA2YDEEYuALmANoAMAuoqAA4D2sqxqDAdrSAB6IC0AZgAsATnQAmCgICM4gKwAaEAE9E4oQDZ0AgOzSKOgByjZ+kUIC+FpWkw58AYwBOYAIalKNJCEbNWHLl4EQVF0OXFhXUUVRFkKdE0hYyirGwwsXDxIFk8uXxY2Tm8gjSEw6Wk9Qx1o1QRpDXF0HRENarlUkFts4jxsVFhiXO98-yLQIL4k9FakoSilOukxOQppAQpJQwEd3c7bQhJ8fsHh+iYCgOL+SQF0CoFxQ1laxAE5MqFpOWERR6EPvN9hhnG5SH0BkNqHkLmNAjdpIZmuJxBo5I1XvUVmsNltdntOuwGIR4N40DC-IV4cEhJsZnIdFIXot+BodDMRIYNCIWg0NPy2cC7LgKZdxjx+N8xDodJEaiyEJJpBI9DoNDsRE8GdJLNYuhhDmBSKK4ddgu8yiIGUz5AqLQlvr9-oCBELQe4wCaqWaQuzwnLMcswjjNhRtvjXXruhAWF6rhNENM2vKYljg+tQ+H8VYrEA */
  id: "ui",
  initial: "idle",
  states: {
    idle: {
      on: {
        delete: "delete",
        create: "create",
        edit: "edit",
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
          reenter: true,
        },
      },
    },
  },
});

const uiActor = createActor(uiMachine);

export { uiActor, uiMachine };
