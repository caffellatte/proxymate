import { CreateProxy, EditProxy } from "@/renderer/components/dialogs";
import { Button, Dialog, DialogTrigger } from "@/renderer/components/ui/";
import { FC, SetStateAction, Dispatch } from "react";
import { uiMachine } from "@/xstate";
import { Actor, StateFrom } from "xstate";

interface IHeaderProps {
  createProxyDialogOpen: boolean;
  setCreateProxyDialogOpen: Dispatch<SetStateAction<boolean>>;
  editProxyDialogOpen: boolean;
  setEditProxyDialogOpen: Dispatch<SetStateAction<boolean>>;
  selectedForEditProxy: string | null;
  uiSend: Actor<typeof uiMachine>["send"];
  uiState: StateFrom<typeof uiMachine>;
}

const Header: FC<IHeaderProps> = ({
  createProxyDialogOpen,
  setCreateProxyDialogOpen,
  editProxyDialogOpen,
  setEditProxyDialogOpen,
  selectedForEditProxy,
  uiSend,
}) => {
  return (
    <header className="flex justify-end">
      <Dialog
        open={createProxyDialogOpen}
        onOpenChange={setCreateProxyDialogOpen}
      >
        <DialogTrigger asChild>
          <Button
            onClick={() => {
              uiSend({ type: "create" });
            }}
            variant="outline"
          >
            Create Proxy
          </Button>
        </DialogTrigger>
        <CreateProxy setOpen={setCreateProxyDialogOpen} />
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
