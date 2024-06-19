import { IProxy } from "@/types";

import { createMachine, createActor } from "xstate";
const proxyMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7AHgTwHQEkA7AQwGMAXASwDcwBiMq648sAbQAYBdRFdWSlXSFeITIgAcHCbgBsHAIwBWAOwcVCgMzalAGhDZEAJgCcHXBKVLNClZoAslhSdmaAvm-1oseAIIUaeggwRhoWdm5RZH5BSmFRcQQFaVlcDiM7e00VPQNEawU5FRM1Iw4le0V7FQ8vDBxcfyZ6SkJmABtKCHDOHiQQaIEhEX7E5JNNCyMJBSNcwwQZ3CUOVYV7K0r12Qlagfq8Ig6uulQQgOZWXqiY4YTEZUnNIyMNzWly+yNn-QXZWXsy1MNi+KgkmlkEz23gaR2InQgdGCoUuET6fCGcRGoESSlkKlwmhMFWKakUtl+xjMFisNkyThc7j2hHQwXg-RhCwxsXio0QAFpZJSEPylLgTBKJaoONUNtITNCDgQSBcwDdMbycYh5OY8ao8c8FJY5sKKoD1LJgfIlGZVIqfI1VeqedixA9vgTVmDZvNjBDcHMbETNlUap59g64QjnXc+QgvsLkkYA0ZZKo1BUqjsPB4gA */
  id: "proxy",
  types: {
    events: {} as
      | { type: "activate" }
      | { type: "deactivate" }
      | { type: "invalidate" }
      | { type: "reactivate" },
  },
  initial: "Inactive",
  context: {} as { proxy: Omit<IProxy, "state"> },
  states: {
    Inactive: {
      on: {
        activate: {
          target: "Active",
          actions: {
            type: "clearError",
          },
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
          actions: {
            type: "setError",
            params: {
              code: 400,
            },
          },
        },
      },
      description: "The proxy is currently active and is tunneling traffic.",
    },
    Invalid: {
      on: {
        reactivate: {
          target: "Active",
          actions: {
            type: "clearError",
          },
        },
        deactivate: {
          target: "Inactive",
          actions: {
            type: "clearError",
          },
        },
      },
      description:
        "The proxy is in an invalid state due to some error or misconfiguration.",
    },
  },
});

const proxyActor = createActor(proxyMachine);

export { proxyActor };
