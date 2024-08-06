import { Header } from "@/renderer/components/common";
import { Main } from "@/renderer/components/views";
import { uiActor } from "@/xstate";
import { useSelector } from "@xstate/react";

// TODO: listen to ESC button

const Layout = () => {
  const uiActorState = useSelector(uiActor, (state) => state);

  return (
    <div className="container py-5 flex flex-col gap-6">
      <div className="p-4 bg-slate-500 rounded-sm">
        <p>{JSON.stringify(uiActorState.value)}</p>
        <p>{JSON.stringify(uiActorState.context)}</p>
      </div>
      <Header />
      <Main />
    </div>
  );
};

export default Layout;
