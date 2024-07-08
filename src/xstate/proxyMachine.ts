import { setup } from "xstate";
import { IProxy } from "@/types";

const proxyMachine = setup({
  types: {
    events: {} as
      | { type: "activate" }
      | { type: "deactivate" }
      | { type: "invalidate" }
      | { type: "reactivate" },
    context: {} as IProxy,
    input: {} as IProxy,
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7AHgTwHQEkA7AQwGMAXASwDcwBiMq648sAbQAYBdRFdWSlXSFeITIgAcHCbgBsHAIwBWAOwcVCgMzalAGhDZEAJgCcHXBKVLNClZoAslhSdmaAvm-1oseAIIUaeggwRhoWdm5RZH5BSmFRcQQFaVlcDiM7e00VPQNEawU5FRM1Iw4le0V7FQ8vDBxcfyZ6SkJmABtKCHDOHiQQaIEhEX7E5JNNCyMJBSNcwwQZ3CUOVYV7K0r12Qlagfq8Ig6uulQQgOZWXqiY4YTEZUnNIyMNzWly+yNn-QXZWXsy1MNi+KgkmlkEz23gaR2InQgdGCoUuET6fCGcRGoESSlkKlwmhMFWKakUtl+xjMFisNkyThc7j2hHQwXg-RhCwxsXio0QAFpZJSEPylLgTBKJaoONUNtITNCDgQSBcwDdMbycYh5OY8ao8c8FJY5sKKoD1LJgfIlGZVIqfI1VeqedixA9vgTVmDZvNjBDcHMbETNlUap59g64QjnXc+QgvsLkkYA0ZZKo1BUqjsPB4gA */
  id: "proxy",
  initial: "Inactive",
  context: ({ input }) => ({
    id: input.id,
    name: input.name,
    description: input.description,
    port: input.port,
    proxy_protocol: input.proxy_protocol,
    proxy_host: input.proxy_host,
    proxy_port: input.proxy_port,
    authentication: {
      authentication: input.authentication.authentication,
      username: input.authentication.username,
      password: input.authentication.password,
    },
    created: input.created,
    updated: input.updated,
  }),
  states: {
    Inactive: {
      on: {
        activate: {
          target: "Active",
          // actions: {
          //   type: "clearError",
          // },
        },
      },
      description:
        "The proxy is not currently active and is waiting to be started.",
    },
    Active: {
      on: {
        deactivate: {
          target: "Inactive",
        },
        invalidate: {
          target: "Invalid",
          // actions: {
          //   type: "setError",
          //   params: {
          //     code: 400,
          //   },
          // },
        },
      },
      description: "The proxy is currently active and is tunneling traffic.",
    },
    Invalid: {
      on: {
        reactivate: {
          target: "Active",
          // actions: {
          //   type: "clearError",
          // },
        },
        deactivate: {
          target: "Inactive",
          // actions: {
          //   type: "clearError",
          // },
        },
      },
      description:
        "The proxy is in an invalid state due to some error or misconfiguration.",
    },
  },
});

export { proxyMachine };
