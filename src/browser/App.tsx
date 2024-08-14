import debug from "debug";
debug.enable("*");

const logger = debug("browser:App");

const App = () => {
  logger("Hello World!");
  return (
    <>
      <>Hello World!</>
    </>
  );
};

export default App;
