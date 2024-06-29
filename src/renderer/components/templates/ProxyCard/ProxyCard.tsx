import { FC } from "react";
import { Button, Label, Typography } from "@/renderer/components/ui";
import { IProxy } from "@/types";
import { X } from "lucide-react";
import { uiActor } from "@/xstate";

interface IProxyCardProps {
  proxy: Omit<IProxy, "state">;
}

const ProxyCard: FC<IProxyCardProps> = ({ proxy }) => {
  const { id, name, description, port } = proxy;

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
    </div>
  );
};

export default ProxyCard;
