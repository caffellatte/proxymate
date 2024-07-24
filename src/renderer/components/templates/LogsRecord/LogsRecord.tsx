import { FC } from "react";
import { ILogsRecord } from "@/types";
import { Typography } from "@/renderer/components/ui";

interface LogsRecord {
  log: ILogsRecord;
}

const LogsRecord: FC<LogsRecord> = ({ log }) => {
  const {
    connectionId,
    url,
    stats: { srcTxBytes, srcRxBytes, trgTxBytes, trgRxBytes },
  } = log;
  return (
    <div className="flex flex-col gap-2 border rounded-md">
      {/* connectionId & url */}
      <div className="flex justify-between">
        <Typography variant="small">{connectionId}</Typography>
        <Typography variant="small">{url}</Typography>
      </div>
      {/* stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="grid grid-cols-4 items-center gap-4">
          <Typography variant="small">
            Number of bytes sent to client:
          </Typography>
          <Typography variant="small" className="col-span-3">
            {srcTxBytes}
          </Typography>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Typography variant="small">
            Number of bytes received from client:
          </Typography>
          <Typography variant="small" className="col-span-3">
            {srcRxBytes}
          </Typography>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Typography variant="small">
            Number of bytes sent to target server (proxy or website):
          </Typography>
          <Typography variant="small" className="col-span-3">
            {trgTxBytes}
          </Typography>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Typography variant="small">
            Number of bytes received from target server (proxy or website):
          </Typography>
          <Typography variant="small" className="col-span-3">
            {trgRxBytes}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LogsRecord;
