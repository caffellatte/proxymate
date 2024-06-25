import { FC, Dispatch, SetStateAction } from "react";
import { Button, Label, Typography } from "@/renderer/components/ui";
import { IProxy } from "@/types";
import { X } from "lucide-react";

interface IProxyCardProps {
  proxy: Omit<IProxy, "state">;
  setSelectedForEditProxy: Dispatch<SetStateAction<string | null>>;
}

const ProxyCard: FC<IProxyCardProps> = ({ proxy, setSelectedForEditProxy }) => {
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
              setSelectedForEditProxy(id.toString());
            }}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => {
              window.electronAPI.proxyDelete(id.toString()).then((data) => {
                alert(data);
              });
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
