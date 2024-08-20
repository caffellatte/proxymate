import { ITab } from "@/interfaces/tab";

import { createMachine, createActor, assign } from "xstate";

/**
 * TODO: add guards
 * */

const tabsMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgwEMBbMAeQDN8QAHLWASwBcGsNqAPRAWgDZ0Anj17I0mEuQoA6BhmYNCAGwDKTQkzDU6jFm06IALACZBiABwBGKQFZRooA */
  id: "tabs",
  types: {} as {
    context: {
      tabs: Record<string, ITab>;
      tabIds: number[];
    };
    events:
      | {
          type: "add";
          newTab: Omit<ITab, "id">;
        }
      | {
          type: "close";
          id: string;
        }
      | {
          type: "update";
          updatedTab: ITab;
        };
  },
  context: {
    tabs: {},
    tabIds: [],
  },
  on: {
    add: {
      actions: assign({
        tabs: ({ context, event }) => {
          const id = context.tabIds.length + 1;
          return {
            ...context.tabs,
            [id]: {
              id,
              ...event.newTab,
            },
          };
        },
        tabIds: ({ context }) => {
          const id = context.tabIds.length + 1;
          return context.tabIds.concat(id);
        },
      }),
    },
    update: {
      actions: assign({
        tabs: ({ context, event }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [event.updatedTab.id]: value, ...rest } = context.tabs;
          return {
            ...rest,
            [event.updatedTab.id]: {
              id: event.updatedTab.id,
              url: event.updatedTab.url,
            },
          };
        },
      }),
    },
    close: {
      actions: assign({
        tabs: ({ context, event }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { [event.id]: value, ...rest } = context.tabs;
          return rest;
        },
        tabIds: ({ context, event }) =>
          context.tabIds.filter((tabId) => tabId !== Number(event.id)),
      }),
    },
  },
});

const tabsActor = createActor(tabsMachine);

export { tabsMachine, tabsActor };
