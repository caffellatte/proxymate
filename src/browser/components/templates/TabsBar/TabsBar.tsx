import { FC } from "react";
import { Button } from "@/shared/ui";
import { Plus } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TabsBarProps {}

const TabsBar: FC<TabsBarProps> = () => {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost">
        <Plus />
      </Button>
    </div>
  );
};

export default TabsBar;
