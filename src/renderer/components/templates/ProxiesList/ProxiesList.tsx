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

  return (
    <div className="min-w-[400px]">
      {proxiesActorState.context.proxies.length > 0 && (
        <div className="flex flex-col gap-3">
          {proxiesActorState.context.proxies
            .sort(
              (p1, p2) =>
                Number(p1.getSnapshot().context.id) -
                Number(p2.getSnapshot().context.id)
            )
            .map((proxy, index) => {
              return <ProxyCard key={index} proxy={proxy} />;
            })}
        </div>
      )}
    </div>
  );
};

export default ProxiesList;
