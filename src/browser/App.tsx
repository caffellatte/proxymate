import Layout from "@/browser/components/layout";
import debug from "debug";
debug.enable("*");

const logger = debug("browser:App");

const App = () => {
  logger("Hello World!");
  return <Layout />;
};

export default App;
