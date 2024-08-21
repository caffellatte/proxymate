import { SearchBar, TabsBar } from "@/browser/components/templates";
import { tabsActor } from "@/xstate/tabsMachine";
import { useSelector } from "@xstate/react";

const Layout = () => {
  const tabsState = useSelector(tabsActor, (state) => state);

  return (
    <div className="container py-5 flex flex-col gap-4">
      <div className="p-4 bg-slate-500 rounded-sm">
        <p>{JSON.stringify(tabsState.value)}</p>
        <p>{JSON.stringify(tabsState.context)}</p>
      </div>
      <TabsBar />
      <SearchBar />
    </div>
  );
};

export default Layout;
