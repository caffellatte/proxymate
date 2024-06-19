import { createMachine, createActor } from "xstate";
const uiMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QFcCWA6ANgewIYVQDsoACABwCdsAPVOAYk1VgBcBtABgF1FQztYqFqmyFeIaogBMARgBs6AKwzFcqYoA0IAJ6IZAZinoOJkzICc5jpZkAOAL72taLHgLFyVWgzABbMizanDxIIPyCwqLikgiyCsqq6lq6CLYySqYcFlY2Dk4gLpQ0dLAkTKz0+BDB4uFCImKhMYr6CnKJ5opSACxq5gDsmjrS-f3o5vJy-Ry2-d0cLXnOGADuYJgAxti+YJUQ1dy1AvVRTYgtbR1dvVIDQym2tuiDptnWE0sFGEXepeUs9Ag6zALDANVCdUijVAMSktg46DhMlu1z6g30yWk+n0xky3SkHH6+lmyMcy3QVRIBFwOCg9FgyA2GzgpSqkHBfGOUOi51a6HafVRt0GmNiUjG3Um01m80WZK+6CBmBBYCpqBp2DpDKZLKpwNBHLCXIaPNi8iUKjU92kthxijxBKJJMc+UI2CB8FCaCOERNZwQAFo5KKg-KXDh8ERSD8Sj6TtCJIh8aLHuhJXIM7Z2v12rZup9Cl4SmVmCw49z-fpzE9zMLDHM0S1RVJsRlTPjCcT+qT8i41pttmBy36YUmODjJZLCQ3hU3hqlzIj7WZLO87GGMJTqbTh6dRwhpov9BxukTxTc7s3xeMpTM5gtiRvFfrVdvNbuE80cSL5xYcbNl2PXJzHzF17CAA */
  id: "ui",
  initial: "loading proxies",
  states: {
    "loading proxies": {
      on: {
        list: "proxies list",
        empty: "welcome",
      },
    },

    "proxies list": {
      on: {
        delete: "delete dialog",
      },
    },

    welcome: {},

    "add dialog": {
      on: {
        "success added": {
          target: "proxies list",
          reenter: true,
        },
      },
    },

    "delete dialog": {
      on: {
        "success delete": {
          target: "proxies list",
          reenter: true,
        },
      },
    },
  },
});

const uiActor = createActor(uiMachine);

export { uiActor };
