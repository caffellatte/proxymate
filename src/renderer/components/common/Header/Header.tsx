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
  const uiActorState = useSelector(uiActor, (state) => state);
  const isCreateDialogOpen = uiActorState.matches("create");
  const isEditDialogOpen = uiActorState.matches("edit");
  const isDeleteDialogOpen = uiActorState.matches("delete");
  logger(uiActorState);

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
