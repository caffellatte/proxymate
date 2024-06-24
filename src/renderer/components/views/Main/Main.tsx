import { FC, SetStateAction, Dispatch } from "react";
import { ProxiesList } from "@/renderer/components/templates";

interface IMainProps {
  setSelectedForEditProxy: Dispatch<SetStateAction<string>>;
}

const Main: FC<IMainProps> = ({ setSelectedForEditProxy }) => {
  return (
    <main>
      <ProxiesList setSelectedForEditProxy={setSelectedForEditProxy} />
    </main>
  );
};

export default Main;
