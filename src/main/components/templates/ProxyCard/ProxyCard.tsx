import { FC, useEffect } from "react";
import { Button, Label, Typography } from "@/shared/ui";
import { X, Play, Pause, ListIcon } from "lucide-react";
import { uiActor, proxyMachine } from "@/xstate";
import { ActorRefFrom } from "xstate";
import { useSelector } from "@xstate/react";
import { dateTimeformatter } from "@/shared/lib/utils";
import debug from "debug";

const logger = debug("ProxyCard");

interface IProxyCardProps {
  proxy: ActorRefFrom<typeof proxyMachine>;
}

const ProxyCard: FC<IProxyCardProps> = ({ proxy }) => {
  const { id, name, description, port, created, updated } =
    proxy.getSnapshot().context;

  const state = useSelector(proxy, (state) => state.value);

  useEffect(() => {
    window.electronAPI.serversGetIds().then((data) => {
      logger(data);
      if (data.indexOf(id) !== -1) {
        proxy.send({ type: "activate" });
      }
    }); // TODO: move serverIds to xstate ?
  }, []); //eslint-disable-line

  return (
    <div className="flex flex-col gap-4 p-2 border rounded-md">
      <div className="flex items-center justify-between">
        <Typography variant="large">{name}</Typography>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              uiActor.send({ type: "log", logId: id });
            }}
          >
            <ListIcon />
          </Button>
          {state.match("Inactive") && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                proxy.send({ type: "activate" });
                const proxytSnapshot = proxy.getSnapshot().context;
                window.electronAPI.proxyStart(proxytSnapshot);
              }}
            >
              <Play />
            </Button>
          )}
          {state.match("Active") && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                proxy.send({ type: "deactivate" });
                window.electronAPI.proxyStop(id);
              }}
            >
              <Pause />
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              uiActor.send({ type: "edit", proxyId: id.toString() });
            }}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              uiActor.send({ type: "delete", proxyId: id.toString() });
            }}
          >
            <X />
          </Button>
        </div>
      </div>
      {description && <Typography variant="small">{description}</Typography>}
      <div className="flex gap-1">
        <Label>Port:</Label>
        <Typography variant="small">{port}</Typography>
      </div>
      <div className="flex gap-1">
        <Label>Created:</Label>
        <Typography variant="small">
          {dateTimeformatter.format(created)}
        </Typography>
      </div>
      <div className="flex gap-1">
        <Label>Updated:</Label>
        <Typography variant="small">
          {dateTimeformatter.format(updated)}
        </Typography>
      </div>
    </div>
  );
};

export default ProxyCard;
