import { useEffect } from "react";
import { uiActor, proxiesActor, logsActor } from "@/xstate";
import Layout from "@/main/components/layout";
import debug from "debug";
debug.enable("*");

const logger = debug("main:App");

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
