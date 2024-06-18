import { proxyActor } from "../machine";
import {
  CreateProxy,
  EditProxy,
  ProxiesList,
} from "@/renderer/components/templates";
import { Button, Dialog, DialogTrigger } from "@/renderer/components/ui/";
import { useEffect, useState } from "react";

const App = () => {
  proxyActor.subscribe((snapshot) => {
    console.log("Value:", snapshot.value);
  });
  proxyActor.start();
  proxyActor.send({ type: "activate" });

  const [createProxyDialogOpen, setCreateProxyDialogOpen] =
    useState<boolean>(false);

  const [editProxyDialogOpen, setEditProxyDialogOpen] =
    useState<boolean>(false);

  const [selectedForEditProxy, setSelectedForEditProxy] = useState<
    string | null
  >(null);

  useEffect(() => {
    if (selectedForEditProxy !== null) {
      setEditProxyDialogOpen(true);
    }
  }, [selectedForEditProxy]);

  useEffect(() => {
    if (!editProxyDialogOpen) {
      setSelectedForEditProxy(null);
    }
  }, [editProxyDialogOpen]);

  return (
    <div className="container py-5 flex flex-col">
      <header className="flex justify-end">
        <Dialog
          open={createProxyDialogOpen}
          onOpenChange={setCreateProxyDialogOpen}
        >
          <DialogTrigger asChild>
            <Button variant="outline">Create Proxy</Button>
          </DialogTrigger>
          <CreateProxy setOpen={setCreateProxyDialogOpen} />
        </Dialog>
        <Dialog
          open={editProxyDialogOpen}
          onOpenChange={setEditProxyDialogOpen}
        >
          <EditProxy
            selectedForEditProxy={selectedForEditProxy}
            setOpen={setCreateProxyDialogOpen}
          />
        </Dialog>
      </header>
      <main>
        <ProxiesList setSelectedForEditProxy={setSelectedForEditProxy} />
      </main>
    </div>
  );
};

export default App;
