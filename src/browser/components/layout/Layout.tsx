import { SearchBar, TabsBar } from "@/browser/components/templates";
import { tabsActor } from "@/xstate/tabsMachine";
import { useSelector } from "@xstate/react";
import { useLayoutEffect, useRef } from "react";
import debug from "debug";
const logger = debug("browser:Layout");

const Layout = () => {
  const tabsState = useSelector(tabsActor, (state) => state);

  const layoutRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (layoutRef.current && window?.innerWidth && window?.innerHeight) {
        const { clientHeight } = layoutRef.current;
        const { innerWidth, innerHeight } = window;
        const viewParams = {
          width: innerWidth,
          height: innerHeight,
          topOffset: clientHeight,
        };
        logger("viewParams:", viewParams);
        // a function defined in the context bridge that sends the dimensions back via IPC
        window.electronAPI.sendResizeEvent(viewParams);
      }
    };
    // Do this once on init
    handleResize();
    // Also do this on resize, when dev tools is open, etc.
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div ref={layoutRef} className="container py-5 flex flex-col gap-4">
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
