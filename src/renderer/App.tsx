import { useEffect } from "react";
import { uiActor } from "@/xstate";
import Layout from "@/renderer/components/layout";

const App = () => {
  useEffect(() => {
    uiActor.start();
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
