import { useEffect } from "react";
import { uiActor, proxiesActor, logsActor } from "@/xstate";
import Layout from "@/renderer/components/layout";
import debug from "debug";
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
        logger(proxy);
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        uiActor.send({ type: "list" });
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
