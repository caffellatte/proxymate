import { useEffect } from "react";
import { uiActor, proxiesActor, logsActor } from "@/xstate";
import Layout from "@/renderer/components/layout";
import debug from "debug";
import { ILogsRecord } from "@/types";
debug.enable("*");

const logger = debug("renderer:App");

const App = () => {
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

        logsActor.getSnapshot().context.logs[value.proxyId].send({
          // TODO: remove `getSnapshot`
          type: "update",
          updatedLog: value,
        });
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

        logsActor.getSnapshot().context.logs[value.proxyId].send({
          // TODO: remove `getSnapshot`
          type: "create",
          newLog: value,
        });
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
