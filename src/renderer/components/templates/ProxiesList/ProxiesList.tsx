import { IProxy } from "@/types";
import { useState, FC } from "react";
import { ProxyCard } from "@/renderer/components/templates";

const ProxiesList: FC = () => {
  const [proxies, setProxies] = useState<Omit<IProxy, "state">[] | []>([]);
  window.electronAPI.proxyList().then((data) => {
    setProxies(data);
  });

  return (
    <div>
      {proxies.length > 0 && (
        <div className="flex flex-col gap-3">
          {proxies.map((proxy) => (
            <ProxyCard key={proxy.id} proxy={proxy} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProxiesList;
