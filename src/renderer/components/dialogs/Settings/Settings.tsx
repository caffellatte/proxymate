import { FC } from "react";
import { DialogContent, DialogClose } from "@/renderer/components/ui";
import { uiActor } from "@/xstate";
// import { useSelector } from "@xstate/react";

const Settings: FC = () => {
  // const state = useSelector(uiActor, (state) => state);

  return (
    <DialogContent
      onInteractOutside={() => {
        uiActor.send({ type: "idle" });
      }}
      className="max-w-[604px]"
    >
      <DialogClose
        onClick={() => {
          uiActor.send({ type: "idle" });
        }}
      />
    </DialogContent>
  );
};

export default Settings;
