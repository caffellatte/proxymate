import { FC } from "react";
import { Button, Typography } from "@/shared/ui";
import { Plus } from "lucide-react";
import { tabsActor } from "@/xstate/tabsMachine";
import { useSelector } from "@xstate/react";
import debug from "debug";

const logger = debug("browser:TabsBar");

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TabsBarProps {}

const TabsBar: FC<TabsBarProps> = () => {
  const tabs = useSelector(tabsActor, (state) => state.context.tabs);

  return (
    <div className="flex items-center gap-4">
      <div className=" flex items-center gap-1">
        {Object.keys(tabs).map((tabId) => {
          return (
            <div key={tabId}>
              <Typography variant="muted">{tabs[tabId].id}</Typography>
            </div>
          );
        })}
      </div>
      <Button
        variant="ghost"
        onClick={() => {
          logger("clicked");
          tabsActor.send({ type: "add", newTab: { url: "test" } });
        }}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default TabsBar;
