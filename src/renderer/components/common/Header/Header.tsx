import { uiActor } from "@/xstate";
import { useSelector } from "@xstate/react";
import { FC } from "react";
import { Button, Dialog } from "@/renderer/components/ui/";
import {
  CreateProxy,
  DeleteProxy,
  EditProxy,
} from "@/renderer/components/dialogs";

const Header: FC = () => {
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
      <Dialog open={state.matches("edit")}>
        <EditProxy />
      </Dialog>
      <Dialog open={state.matches("delete")}>
        <DeleteProxy />
      </Dialog>
    </header>
  );
};

export default Header;
