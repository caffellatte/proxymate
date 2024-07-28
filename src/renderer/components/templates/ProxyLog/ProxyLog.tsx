import { Button, ScrollArea } from "@/renderer/components/ui";
import { uiActor } from "@/xstate";
import { XCircle, Trash2 } from "lucide-react";
import { useSelector } from "@xstate/react";
import debug from "debug";
import { useState } from "react";
import { ILogsRecord } from "@/types";
import { LogsRecord } from "@/renderer/components/templates";
const logger = debug("Renderer:ProxyLog");

const ProxyLog = () => {
  const [logs, setLogs] = useState<
    Record<number, Omit<ILogsRecord, "proxyId" | "connectionId">>
  >({});
  const logId = useSelector(uiActor, (state) => state.context.logId);

  window.electronAPI.updateLogs((value: ILogsRecord) => {
    logger(value);
    if (logId !== value.proxyId) return;

    setLogs((prevState) => ({
      ...prevState,
      [Number(value.connectionId)]: {
        stats: value.stats,
        url: value.url,
      },
    }));
  });

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
            setLogs([]);
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
