import { IProxy } from "@/types";
import { useState, FC, SetStateAction, Dispatch } from "react";
import { Button, Typography } from "@/renderer/components/ui";
import { X } from "lucide-react";

interface IProxiesListProps {
  setSelectedForEditProxy: Dispatch<SetStateAction<string | null>>;
}

const ProxiesList: FC<IProxiesListProps> = ({ setSelectedForEditProxy }) => {
  const [proxies, setProxies] = useState<Omit<IProxy, "state">[] | []>([]);
  window.electronAPI.proxyList().then((data) => {
    setProxies(data);
  });

  return (
    <div>
      {proxies.length > 0 && (
        <div className="flex flex-col gap-3">
          {proxies.map(({ id, name }) => (
            <div key={id} className="flex flex-col">
              <div className="flex items-center justify-between">
                <Typography variant="large">{name}</Typography>
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
                    window.electronAPI
                      .proxyDelete(id.toString())
                      .then((data) => {
                        alert(data);
                      });
                  }}
                >
                  <X />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProxiesList;
