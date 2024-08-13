import { Button, ScrollArea, Typography } from "@/renderer/components/ui";
import { uiActor, logsActor } from "@/xstate";
import { XCircle, Trash2 } from "lucide-react";
import { useSelector } from "@xstate/react";
import debug from "debug";
import { LogsRecord } from "@/renderer/components/templates";
import { useEffect } from "react";
import { ILogsRecord } from "@/types";
const logger = debug("Renderer:ProxyLog");

const ProxyLog = () => {
  const logId = useSelector(uiActor, (state) => state.context.logId);

  const logsActorState = useSelector(logsActor, (state) => state);

  logger("logId:", logId);

  const logs = useSelector(
    logsActor,
    (state) => state.context.logs[logId as string]
  );

  const logActorState = useSelector(logs, (state) => state);

  useEffect(() => {
    window.electronAPI.logGetAll(logId as string).then((data) => {
      logger(data);
      for (const [key, value] of data) {
        logger("key:", key);
        logger("value:", value);

        const { url, created, updated, stats } = value;
        logs.send({
          type: "add",
          log: {
            proxyId: logId as string,
            connectionId: Number(key),
            url,
            created,
            updated,
            stats,
          },
        });
      }
    });
  }, []); // eslint-disable-line

  useEffect(() => {
    const removeEventListener = window.electronAPI.updateLogs(
      (value: ILogsRecord) => {
        logger(value);

        logs.send({
          type: "update",
          updatedLog: value,
        });
      }
    );

    return () => {
      removeEventListener();
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    const removeEventListener = window.electronAPI.createLogs(
      (value: ILogsRecord) => {
        logger(value);

        logs.send({
          // TODO: remove `getSnapshot`
          type: "create",
          newLog: value,
        });
      }
    );

    return () => {
      removeEventListener();
    };
  }, []); // eslint-disable-line

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
            logsActorState.context.logs[logId].send({ type: "clear" });
          }}
          className="self-end"
        >
          <Trash2 />
        </Button>
      )}

      <Typography variant="small">{logId}</Typography>
      {logId && (
        <ScrollArea className="h-full w-full rounded-md border p-4">
          <div className="flex flex-col gap-2">
            {Object.keys(logActorState.context.log).map((connectionId) => {
              const logRecord = {
                connectionId: Number(connectionId),
                ...logActorState.context.log[Number(connectionId)],
              };

              return <LogsRecord key={connectionId} log={logRecord} />;
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default ProxyLog;
