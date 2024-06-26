// import { proxyActor, proxyMachine } from "@/xstate";
import { uiMachine } from "@/xstate";
import { useMachine } from "@xstate/react";

import { Header } from "@/renderer/components/common";
import { Main } from "@/renderer/components/views";
import { useEffect, useState } from "react";

const App = () => {
  // proxyActor.subscribe((snapshot) => {
  //   console.log("Value:", snapshot.value);
  // });
  // proxyActor.start();
  // proxyActor.send({ type: "activate" });

  // TODO: add createActorContext
  const [uiState, uiSend] = useMachine(uiMachine);

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
    <div className="container py-5 flex flex-col gap-6">
      <div className="p-4 bg-slate-500 rounded-sm">
        {uiState.value.toString()}
      </div>
      <Header
        createProxyDialogOpen={createProxyDialogOpen}
        setCreateProxyDialogOpen={setCreateProxyDialogOpen}
        editProxyDialogOpen={editProxyDialogOpen}
        setEditProxyDialogOpen={setEditProxyDialogOpen}
        selectedForEditProxy={selectedForEditProxy}
        uiState={uiState}
        uiSend={uiSend}
      />
      <Main setSelectedForEditProxy={setSelectedForEditProxy} />
    </div>
  );
};

export default App;
