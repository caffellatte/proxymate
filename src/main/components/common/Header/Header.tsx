import { uiActor, sessionActor } from "@/xstate";
import { useSelector } from "@xstate/react";
import { FC } from "react";
import { Button, Dialog } from "@/shared/ui";
import {
  CreateProxy,
  CreateSession,
  DeleteProxy,
  EditProxy,
  Settings,
} from "@/main/components/dialogs";
import { SessionSwitcher } from "@/main/components/templates";
import debug from "debug";
const logger = debug("main:Header");

const Header: FC = () => {
  const uiActorState = useSelector(uiActor, (state) => state);
  const sessionActorState = useSelector(sessionActor, (state) => state);
  const isCreateDialogOpen = uiActorState.matches("create");
  const isEditDialogOpen = uiActorState.matches("edit");
  const isDeleteDialogOpen = uiActorState.matches("delete");
  const isSettingsDialogOpen = uiActorState.matches("settings");
  const isCreateOpen = sessionActorState.matches("createSessionDialog");
  logger(uiActorState);

  return (
    <header className="flex flex-col gap-4">
      <SessionSwitcher />
      <div className="flex justify-end">
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
      <Dialog open={isCreateOpen}>
        <CreateSession />
      </Dialog>
    </header>
  );
};

export default Header;
