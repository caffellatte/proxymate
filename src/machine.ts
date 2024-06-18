import { createMachine, createActor } from "xstate";
const proxyMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAcBOB7AHgTwHQEkA7AQwGMAXASwDcwBiMq648sAbQAYBdRFdWSlXSFeITIgAcARgDsuGQE4AbBJkBWADQhsiAMz7cUjgt0SFatQBYOUyzIC+9rWix4AghRr0IYRjRbs3KLI-IKUwqLiCEYSSrgcAEwyupa66lo6CGq6UrhKijKJHFY2do7OGDi4Hkz0lITMADaUEAGcPEggIQJCIp1RRia4EgnSCZrakrlqHLO2Fta2KuVdlXhETS10qL6ezKztwaG9kYhq47gLKumTCAkX90pqMoUlSxIrLlUbxM0QdD4-PtAh0+D1wn1QFFzmpLlZrhNMqZLLhLNkpLpzG8yitCOgfPBOl9MmCwhF+ogALRKDJU2EKBkKCRWNFM9EOJyrVwEEh7MBHcHkqGIJRPXC6UZSca0hCmWH5BSFBLFRY4ircmpeAVkyFiRBStLxDgyMaIxAJXRxcY5TELUoc9XfBq-Frak4UhCWBIyowJXCPZ6vVXLRz2IA */
  id: "proxy",
  initial: "Inactive",
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
