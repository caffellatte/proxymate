import { uiActor } from "@/xstate";
import { useSelector } from "@xstate/react";
import { FC } from "react";
import { Button, Dialog } from "@/renderer/components/ui/";
import {
  CreateProxy,
  DeleteProxy,
  EditProxy,
} from "@/renderer/components/dialogs";
import debug from "debug";
const logger = debug("renderer:Header");

const Header: FC = () => {
  const state = useSelector(uiActor, (state) => state);
  const isCreateDialogOpen = state.matches("create");
  const isEditDialogOpen = state.matches("edit");
  const isDeleteDialogOpen = state.matches("delete");
  logger(state);

  return (
    <header className="flex justify-end">
      <Dialog open={isCreateDialogOpen}>
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
      <Dialog open={isEditDialogOpen}>
        <EditProxy />
      </Dialog>
      <Dialog open={isDeleteDialogOpen}>
        <DeleteProxy />
      </Dialog>
    </header>
  );
};

export default Header;
