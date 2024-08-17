import { Header } from "@/main/components/common";
import { Main } from "@/main/components/views";
import { uiActor, logsActor } from "@/xstate";
import { useSelector } from "@xstate/react";

const Layout = () => {
  const uiActorState = useSelector(uiActor, (state) => state);
  const logsActorState = useSelector(logsActor, (state) => state);

  return (
    <div className="container py-5 flex flex-col gap-6">
      <div className="p-4 bg-slate-500 rounded-sm">
        <p>{JSON.stringify(uiActorState.value)}</p>
        <p>{JSON.stringify(uiActorState.context)}</p>
        <p>{JSON.stringify(logsActorState.value)}</p>
        <p>{JSON.stringify(logsActorState.context)}</p>
      </div>
      <Header />
      <Main />
    </div>
  );
};

export default Layout;
