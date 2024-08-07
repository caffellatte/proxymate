import { Button, ScrollArea } from "@/renderer/components/ui";
import { uiActor, logsActor } from "@/xstate";
import { XCircle, Trash2 } from "lucide-react";
import { useSelector } from "@xstate/react";
import debug from "debug";
import { LogsRecord } from "@/renderer/components/templates";
const logger = debug("Renderer:ProxyLog");

const ProxyLog = () => {
  const logId = useSelector(uiActor, (state) => state.context.logId);

  logger("logId:", logId);

  const logs = useSelector(logsActor, (state) => state.context.logs);

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
      {logId && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            window.electronAPI.clearLogs(logId);
            logsActor.send({ type: "clear" });
          }}
          className="self-end"
        >
          <Trash2 />
        </Button>
      )}

      {logId}
      <ScrollArea className="h-full w-full rounded-md border p-4">
        <div className="flex flex-col gap-2">
          {Object.keys(logs).map((connectionId) => {
            const log = {
              connectionId: Number(connectionId),
              ...logs[Number(connectionId)],
            };

            return <LogsRecord key={connectionId} log={log} />;
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProxyLog;
