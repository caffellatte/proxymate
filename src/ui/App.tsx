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
      <h1>Hello World!</h1>
    </>
  );
};

export default App;
