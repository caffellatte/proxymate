import { actor } from "../machine";
import { CreateProxy } from "@/renderer/components/templates";
import { Button, Dialog, DialogTrigger } from "@/renderer/components/ui/";

const App = () => {
  actor.subscribe((snapshot) => {
    console.log("Value:", snapshot.value);
  });
  actor.start();
  actor.send({ type: "toggle" });
  actor.send({ type: "toggle" });

  return (
    <div className="container py-5">
      <header className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Proxy</Button>
          </DialogTrigger>
          <CreateProxy />
        </Dialog>
      </header>
    </div>
  );
};

export default App;
