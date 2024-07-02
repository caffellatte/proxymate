import { IProxy } from "@/types";
import { useState, FC } from "react";
import { ProxyCard } from "@/renderer/components/templates";
import { useMachine } from "@xstate/react";
import { proxiesMachine } from "@/xstate";
import debug from "debug";
import { useEffect } from "react";

const logger = debug("renderer:ProxiesList");

const ProxiesList: FC = () => {
  const [state, send] = useMachine(proxiesMachine);

  console.log(state);

  useEffect(() => {
    window.electronAPI.proxyList().then((data) => {
      // setProxies(data);
      data.forEach((proxy) => {
        send({ type: "add", newProxy: proxy });
        logger(proxy);
      });
    });
  }, []);

  // const [proxies, setProxies] = useState<Omit<IProxy, "state">[] | []>([]);

  return (
    <div>
      {state.context.proxies.length > 0 && (
        <div className="flex flex-col gap-3">
          {state.context.proxies.map((proxy, index) => (
            <ProxyCard key={proxy.id} proxy={proxy.getSnapshot().context} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProxiesList;
