import { FC } from "react";
import { ProxiesList, ProxyLog } from "@/renderer/components/templates";
import { useSelector } from "@xstate/react";
import { uiActor } from "@/xstate";

const Main: FC = () => {
  const logId = useSelector(uiActor, (state) => state.context.logId);
  return (
    <main className="flex gap-2">
      <ProxiesList />
      {logId && <ProxyLog />}
    </main>
  );
};

export default Main;
