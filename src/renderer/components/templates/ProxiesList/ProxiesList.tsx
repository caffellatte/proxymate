import { FC } from "react";
import { ProxyCard } from "@/renderer/components/templates";
import { useSelector } from "@xstate/react";
import debug from "debug";
import { proxiesActor } from "@/xstate";

const logger = debug("renderer:ProxiesList");

const ProxiesList: FC = () => {
  const proxiesActorState = useSelector(proxiesActor, (state) => state);

  logger(proxiesActorState);

  /**
   * TODO (1): fromPromise FSM for DB actions
   */
  /**
   * TODO (2): sort by ID
   */

  return (
    <div>
      {proxiesActorState.context.proxies.length > 0 && (
        <div className="flex flex-col gap-3">
          {proxiesActorState.context.proxies.map((proxy, index) => {
            const { id, ...proxySnapshotContext } = proxy.getSnapshot().context;
            return (
              <ProxyCard
                key={index}
                proxy={{ id: id, ...proxySnapshotContext }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProxiesList;
