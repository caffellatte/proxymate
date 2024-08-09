import { useEffect } from "react";
import { uiActor, proxiesActor, logsActor } from "@/xstate";
import Layout from "@/renderer/components/layout";
import debug from "debug";
import { ILogsRecord } from "@/types";
import { useSelector } from "@xstate/react";
debug.enable("*");

const logger = debug("renderer:App");

const App = () => {
  const logsActorState = useSelector(logsActor, (state) => state);

  useEffect(() => {
    uiActor.start();
    proxiesActor.start();
    logsActor.start();
    window.electronAPI.proxyList().then((data) => {
      // setProxies(data);
      data.forEach((proxy) => {
        proxiesActor.send({ type: "add", newProxy: proxy });
        logsActor.send({ type: "init", proxyId: proxy.id });
        logger(proxy);
      });
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    const removeEventListener = window.electronAPI.updateLogs(
      (value: ILogsRecord) => {
        logger(value);

        // if (logId !== value.proxyId) return;

        // logActor.send({ type: "update", updatedLog: value });
        // logsActorState.context.logs[value.proxyId].send({
        //   type: "update",
        //   updatedLog: value,
        // });
      }
    );

    return () => {
      removeEventListener();
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    const removeEventListener = window.electronAPI.createLogs(
      (value: ILogsRecord) => {
        logger(value);
        // if (logId !== value.proxyId) return;

        logger("createLogs: proxyId:", value.proxyId);

        logger(
          "logsActorContext:",
          JSON.stringify(logsActor.getSnapshot().context)
        );
        // logger("logs", JSON.stringify(logs));

        // const logsIds = Object.keys(logs);
        // logger("logsIds:", logsIds);

        // if (logsIds.indexOf(value.proxyId) === -1) {
        //   logger("Init log:", value.proxyId);
        //   logsActor.send({ type: "init", proxyId: value.proxyId });
        // }

        logsActor.getSnapshot().context.logs[value.proxyId].send({
          type: "create",
          newLog: value,
        });
        // logsActor.send({ type: "create", newLog: value });
      }
    );

    return () => {
      removeEventListener();
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        uiActor.send({ type: "idle" });
      }
    };
    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return <Layout />;
};

export default App;
