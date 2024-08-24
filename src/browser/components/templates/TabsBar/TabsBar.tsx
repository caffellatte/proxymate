import { FC } from "react";
import { Button, Typography } from "@/shared/ui";
import { Plus, X } from "lucide-react";
import { tabsActor } from "@/xstate/tabsMachine";
import { useSelector } from "@xstate/react";
import debug from "debug";

const logger = debug("browser:TabsBar");

logger("test");

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TabsBarProps {}

const TabsBar: FC<TabsBarProps> = () => {
  const tabs = useSelector(tabsActor, (state) => state.context.tabs);
  const activeTab = useSelector(tabsActor, (state) => state.context.activeTab);

  return (
    <div className="flex items-center gap-4">
      <div className=" flex items-center gap-1">
        {Object.keys(tabs).map((key) => {
          const tabId = Number(key);
          return (
            <div key={tabId} className="flex items-center">
              <Button
                variant={activeTab === Number(tabId) ? "default" : "outline"}
                onClick={() => {
                  tabsActor.send({ type: "activate", id: tabId });
                }}
              >
                <Typography variant="muted">{tabs[tabId].id}</Typography>
              </Button>
              <Button
                variant="ghost"
                onClick={() => {
                  tabsActor.send({ type: "close", id: tabId });
                }}
              >
                <X />
              </Button>
            </div>
          );
        })}
      </div>
      <Button
        variant="ghost"
        onClick={() => {
          tabsActor.send({ type: "add", newTab: { url: "" } });
        }}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default TabsBar;
