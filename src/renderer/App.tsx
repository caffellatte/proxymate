import { useEffect } from "react";
import { uiActor } from "@/xstate";
import Layout from "@/renderer/components/layout";

const App = () => {
  useEffect(() => {
    uiActor.start();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <Layout />;
};

export default App;
