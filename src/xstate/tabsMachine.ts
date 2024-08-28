import { ITab } from "@/interfaces";

import { createMachine, createActor, assign } from "xstate";

const tabsMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5gF8A0IB2B7CdGgwEMBbMAeQDN8QAHLWASwBcGsNqAPRAWgDZ0Anj17I0mEuQoA6BhmYNCAGwDKTQkzDU6jFm06IALACZBiABwBGKQFZRooA */
    id: "tabs",
    types: {} as {
      context: {
        tabs: Record<number, ITab>;
        tabIds: number[];
        activeTab: number | null;
      };
      events:
        | {
            type: "activate";
            id: number;
          }
        | {
            type: "add";
            newTab: ITab;
          }
        | {
            type: "close";
            id: number;
          }
        | {
            type: "update";
            updatedTab: ITab;
          };
    },
    context: {
      tabs: {},
      tabIds: [],
      activeTab: null,
    },
    on: {
      activate: {
        guard: {
          type: "isValidId",
          params: ({ event }) => ({
            id: event.id,
          }),
        },
        actions: assign({
          activeTab: ({ event }) => event.id,
        }),
      },
      add: {
        actions: assign({
          tabs: ({ context, event }) => {
            return {
              ...context.tabs,
              [event.newTab.id]: {
                ...event.newTab,
              },
            };
          },
          tabIds: ({ context, event }) => {
            return context.tabIds.concat(event.newTab.id);
          },
        }),
      },
      update: {
        guard: {
          type: "isValidId",
          params: ({ event }) => ({
            id: event.updatedTab.id,
          }),
        },
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
        guard: {
          type: "isValidId",
          params: ({ event }) => ({
            id: event.id,
          }),
        },
        actions: assign({
          tabs: ({ context, event }) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [event.id]: value, ...rest } = context.tabs;
            return rest;
          },
          tabIds: ({ context, event }) =>
            context.tabIds.filter((tabId) => tabId !== event.id),
          activeTab: ({ context, event }) => {
            if (event.id === context.activeTab) {
              return null;
            }
            return context.activeTab;
          },
        }),
      },
    },
  },
  {
    guards: {
      isValidId: ({ context }, params: { id: number }) =>
        context.tabIds.includes(params.id),
    },
  }
);

const tabsActor = createActor(tabsMachine);

export { tabsMachine, tabsActor };
