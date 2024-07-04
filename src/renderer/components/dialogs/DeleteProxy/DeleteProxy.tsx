import { FC } from "react";
import {
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/renderer/components/ui";
import { uiActor, proxiesActor } from "@/xstate";
import { useSelector } from "@xstate/react";

const DeleteProxy: FC = () => {
  const proxyId = useSelector(uiActor, (state) => state.context.proxyId);

  const handleDeleteProxy = () => {
    window.electronAPI.proxyDelete(proxyId).then((data) => {
      // intagrate this is xstate as fromPromise
      if (data) uiActor.send({ type: "list" });
    });
    proxiesActor.send({ type: "remove", id: proxyId });
  };

  return (
    <DialogContent
      onInteractOutside={() => {
        uiActor.send({ type: "list" });
      }}
      className="max-w-[604px]"
    >
      <DialogHeader>
        <DialogTitle>Delete Proxy</DialogTitle>
        <DialogDescription>
          {"Proxy will be removed from the database"}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            uiActor.send({ type: "list" });
          }}
        >
          Cancal
        </Button>
        <Button type="button" onClick={handleDeleteProxy}>
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteProxy;
