import { Button, ScrollArea } from "@/renderer/components/ui";
import { uiActor } from "@/xstate";
import { XCircle } from "lucide-react";
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
      {logId}
      <ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
        {logs.map((log) => (
          <LogsRecord key={log.connectionId} log={log} />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ProxyLog;
