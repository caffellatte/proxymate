import Layout from "@/browser/components/layout";
import { useEffect } from "react";
import { tabsActor } from "@/xstate/tabsMachine";
import debug from "debug";
debug.enable("*");

const logger = debug("browser:App");

const App = () => {
  useEffect(() => {
    tabsActor.start();
    /**
     * TODO: Create first tab
     */
  }, []); // eslint-disable-line

  logger("Hello World!");

  return <Layout />;
};

export default App;
