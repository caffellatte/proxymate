import { actor } from "../machine";
import { Button } from "./components/ui/button";

const App = () => {
  actor.subscribe((snapshot) => {
    console.log("Value:", snapshot.value);
  });
  actor.start();
  actor.send({ type: "toggle" });
  actor.send({ type: "toggle" });

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <Button>Test</Button>
    </>
  );
};

export default App;
