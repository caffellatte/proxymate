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
  const [logs, setLogs] = useState<ILogsRecord[]>([]);
  const logId = useSelector(uiActor, (state) => state.context.logId);

  window.electronAPI.updateLogs((value) => {
    logger(value);
    setLogs((oldLogs) => [...oldLogs, value]);
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
      <ScrollArea className="h-screen w-full rounded-md border p-4">
        <div className="flex flex-col gap-2">
          {logs.map((log) => (
            <LogsRecord key={log.connectionId} log={log} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProxyLog;
