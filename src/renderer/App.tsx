import { proxyActor } from "@/xstate";

import { Header } from "@/renderer/components/common";
import { Main } from "@/renderer/components/views";
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
      <Header
        createProxyDialogOpen={createProxyDialogOpen}
        setCreateProxyDialogOpen={setCreateProxyDialogOpen}
        editProxyDialogOpen={editProxyDialogOpen}
        setEditProxyDialogOpen={setEditProxyDialogOpen}
        selectedForEditProxy={selectedForEditProxy}
      />
      <Main setSelectedForEditProxy={setSelectedForEditProxy} />
    </div>
  );
};

export default App;
