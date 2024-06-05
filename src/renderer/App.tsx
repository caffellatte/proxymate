import { actor } from "../machine";
import { CreateProxy } from "@/renderer/components/templates";

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
      <CreateProxy />
    </>
  );
};

export default App;
