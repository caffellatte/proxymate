import { uiActor } from "@/xstate";
import { useSelector } from "@xstate/react";
import { FC } from "react";
import { Button, Dialog } from "@/renderer/components/ui/";
import {
  CreateProxy,
  DeleteProxy,
  EditProxy,
  Settings,
} from "@/renderer/components/dialogs";
import debug from "debug";
const logger = debug("renderer:Header");

const Header: FC = () => {
  const uiActorState = useSelector(uiActor, (state) => state);
  const isCreateDialogOpen = uiActorState.matches("create");
  const isEditDialogOpen = uiActorState.matches("edit");
  const isDeleteDialogOpen = uiActorState.matches("delete");
  const isSettingsDialogOpen = uiActorState.matches("settings");
  logger(uiActorState);

  return (
    <header className="flex justify-end">
      <div className="flex items-center gap-3">
        <Button
          onClick={() => {
            uiActor.send({ type: "settings" });
          }}
          variant="outline"
        >
          Settings
        </Button>
        <Button
          onClick={() => {
            uiActor.send({ type: "create" });
          }}
          variant="outline"
        >
          Create Proxy
        </Button>
      </div>
      <Dialog open={isCreateDialogOpen}>
        <CreateProxy />
      </Dialog>
      <Dialog open={isEditDialogOpen}>
        <EditProxy />
      </Dialog>
      <Dialog open={isDeleteDialogOpen}>
        <DeleteProxy />
      </Dialog>
      <Dialog open={isSettingsDialogOpen}>
        <Settings />
      </Dialog>
    </header>
  );
};

export default Header;
