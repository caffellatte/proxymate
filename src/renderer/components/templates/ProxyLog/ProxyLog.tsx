import { Button } from "@/renderer/components/ui";
import { uiActor } from "@/xstate";
import { XCircle } from "lucide-react";
import { useSelector } from "@xstate/react";

const ProxyLog = () => {
  const logId = useSelector(uiActor, (state) => state.context.logId);

  return (
    <div className="flex flex-col items-start gap-4 p-2 border rounded-md w-full">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          uiActor.send({ type: "log", logId: null });
        }}
        className="self-end"
      >
        <XCircle />
      </Button>
      {logId}
    </div>
  );
};

export default ProxyLog;
