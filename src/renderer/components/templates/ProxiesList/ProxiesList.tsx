import { IProxy } from "@/types";
import { useState, FC } from "react";
import { ProxyCard } from "@/renderer/components/templates";
import { createMachine, assign } from "xstate";
import { proxyMachine } from "@/xstate";

const ProxiesList: FC = () => {
  const [proxies, setProxies] = useState<Omit<IProxy, "state">[] | []>([]);
  window.electronAPI.proxyList().then((data) => {
    setProxies(data);
  });

  const parentMachine = createMachine({
    entry: [
      assign({
        childMachineRef: ({ spawn }) => spawn(proxyMachine, { id: "child" }),
      }),
    ],
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
