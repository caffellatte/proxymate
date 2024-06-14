import { actor } from "../machine";
import { CreateProxy, ProxiesList } from "@/renderer/components/templates";
import { Button, Dialog, DialogTrigger } from "@/renderer/components/ui/";

const App = () => {
  actor.subscribe((snapshot) => {
    console.log("Value:", snapshot.value);
  });
  actor.start();
  actor.send({ type: "toggle" });
  actor.send({ type: "toggle" });

  return (
    <div className="container py-5 flex flex-col">
      <header className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Create Proxy</Button>
          </DialogTrigger>
          <CreateProxy />
        </Dialog>
      </header>
      <main>
        <ProxiesList />
      </main>
    </div>
  );
};

export default App;
