import { IProxy } from "@/types";
import { useState, FC, SetStateAction, Dispatch } from "react";
import { ProxyCard } from "@/renderer/components/templates";

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
          {proxies.map((proxy) => (
            <ProxyCard
              key={proxy.id}
              proxy={proxy}
              setSelectedForEditProxy={setSelectedForEditProxy}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProxiesList;
