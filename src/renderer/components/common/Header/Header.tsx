import { uiActor } from "@/xstate";
import { useSelector } from "@xstate/react";
import { FC, SetStateAction, Dispatch } from "react";
import { Button, Dialog } from "@/renderer/components/ui/";
import { CreateProxy, EditProxy } from "@/renderer/components/dialogs";

interface IHeaderProps {
  editProxyDialogOpen: boolean;
  setEditProxyDialogOpen: Dispatch<SetStateAction<boolean>>;
  selectedForEditProxy: string | null;
}

const Header: FC<IHeaderProps> = ({
  editProxyDialogOpen,
  setEditProxyDialogOpen,
  selectedForEditProxy,
}) => {
  const state = useSelector(uiActor, (state) => state);
  console.log(state);

  console.log("state.matches('create')", state.matches("create"));

  return (
    <header className="flex justify-end">
      <Dialog open={state.matches("create")}>
        <Button
          onClick={() => {
            uiActor.send({ type: "create" });
          }}
          variant="outline"
        >
          Create Proxy
        </Button>
        <CreateProxy />
      </Dialog>
      <Dialog open={editProxyDialogOpen} onOpenChange={setEditProxyDialogOpen}>
        <EditProxy
          selectedForEditProxy={selectedForEditProxy}
          setOpen={setEditProxyDialogOpen}
        />
      </Dialog>
    </header>
  );
};

export default Header;
