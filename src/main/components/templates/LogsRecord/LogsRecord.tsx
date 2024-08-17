import { FC } from "react";
import { ILogsRecord } from "@/interfaces";
import { Typography } from "@/shared/ui";
import { dateTimeformatter } from "@/shared/lib/utils";

interface LogsRecord {
  log: Omit<ILogsRecord, "proxyId">;
}

const LogsRecord: FC<LogsRecord> = ({ log }) => {
  const {
    connectionId,
    url,
    stats: { srcTxBytes, srcRxBytes, trgTxBytes, trgRxBytes },
    created,
    updated,
  } = log;
  return (
    <div className="flex flex-col gap-2 border rounded-md">
      {/* connectionId & url */}
      <div className="flex justify-between">
        <Typography variant="small">{connectionId}</Typography>
        <Typography variant="small">{url}</Typography>
      </div>
      {/* stats */}
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-4 items-center gap-4">
          <Typography variant="small" className="col-span-1">
            Created:
          </Typography>
          <Typography variant="small" className="col-span-3">
            {dateTimeformatter.format(created)}
          </Typography>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Typography variant="small" className="col-span-1">
            Updated:
          </Typography>
          <Typography variant="small" className="col-span-3">
            {dateTimeformatter.format(updated)}
          </Typography>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Typography variant="small" className="col-span-3">
            Number of bytes sent to client:
          </Typography>
          <Typography variant="small">{srcTxBytes}</Typography>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Typography variant="small" className="col-span-3">
            Number of bytes received from client:
          </Typography>
          <Typography variant="small">{srcRxBytes}</Typography>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Typography variant="small" className="col-span-3">
            Number of bytes sent to target server (proxy or website):
          </Typography>
          <Typography variant="small">{trgTxBytes}</Typography>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Typography variant="small" className="col-span-3">
            Number of bytes received from target server (proxy or website):
          </Typography>
          <Typography variant="small">{trgRxBytes}</Typography>
        </div>
      </div>
    </div>
  );
};

export default LogsRecord;
