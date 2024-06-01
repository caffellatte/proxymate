import { actor } from "../machine";

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
    </>
  );
};

export default App;
