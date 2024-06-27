import { Header } from "@/renderer/components/common";
import { Main } from "@/renderer/components/views";
import { useEffect, useState } from "react";
import { uiActor } from "@/xstate";
import { useSelector } from "@xstate/react";

// TODO: listen to ESC button

const Layout = () => {
  const state = useSelector(uiActor, (state) => state);

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
        {state.value.toString()}
      </div>
      <Header
        editProxyDialogOpen={editProxyDialogOpen}
        setEditProxyDialogOpen={setEditProxyDialogOpen}
        selectedForEditProxy={selectedForEditProxy}
      />
      <Main setSelectedForEditProxy={setSelectedForEditProxy} />
    </div>
  );
};

export default Layout;
