import { createMachine, createActor } from "xstate";

import { ILogsRecord } from "@/types";

const logsMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QBsD2VYDoCWFlgGIBjAJzAEMAXMAbQAYBdRUAB1Vm0u1QDtmQAHogC0ARgAsAZkyTJAJgCsC8eICck1QA5RAdh0AaEAE8RO8Zjqbxc1XIBsa0ZMuSAvq8NoMOPIQCuLBBUtIz8bBxcvPxCCMIKctKSOqJ2knaqdAopmnKGJrFmFlY29o7Omm4eIF5YuPjE+OQk9ExIIOGc3HxtMXHOmHKaqnaZdkrZucaIdnaY4jp0GuKaCpbpuu5VPKgQcPw1YeydUT0iCjqaA0MjCmNZdjl5IimimArFtg6qTpZy7p7oWq+Q4RLrRETyVSYBY6c4qTITJ4IaRyWG-SSrTTrdIKTauIA */
  id: "logs",

  context: {
    logs: {},
  },

  initial: "idle",

  types: {} as {
    context: {
      logs: Record<number, Omit<ILogsRecord, "proxyId" | "connectionId">>;
    };
    events:
      | {
          type: "create";
          newLog: ILogsRecord;
        }
      | {
          type: "update";
          updatedLog: ILogsRecord;
        }
      | {
          type: "clear";
        };
  },

  states: {
    idle: {
      on: {
        create: "idle",
        update: "idle",
        clear: "idle",
      },
    },
  },
});

const logsActor = createActor(logsMachine);

export { logsMachine, logsActor };
