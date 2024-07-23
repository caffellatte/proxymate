import { FC } from "react";
import { ILogsRecord } from "@/types";
import { Typography } from "@/renderer/components/ui";

interface LogsRecord {
  log: ILogsRecord;
}

const LogsRecord: FC<LogsRecord> = ({ log }) => {
  const { url } = log;
  return (
    <div>
      <Typography>{url}</Typography>
    </div>
  );
};

export default LogsRecord;
