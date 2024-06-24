import { CreateProxy, EditProxy } from "@/renderer/components/dialogs";
import { Button, Dialog, DialogTrigger } from "@/renderer/components/ui/";
import { FC, SetStateAction, Dispatch } from "react";

interface IHeaderProps {
  createProxyDialogOpen: boolean;
  setCreateProxyDialogOpen: Dispatch<SetStateAction<boolean>>;
  editProxyDialogOpen: boolean;
  setEditProxyDialogOpen: Dispatch<SetStateAction<boolean>>;
  selectedForEditProxy: string | null;
}

const Header: FC<IHeaderProps> = ({
  createProxyDialogOpen,
  setCreateProxyDialogOpen,
  editProxyDialogOpen,
  setEditProxyDialogOpen,
  selectedForEditProxy,
}) => {
  return (
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
