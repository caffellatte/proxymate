import { FC } from "react";
import { Button, Input } from "@/shared/ui";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  return (
    <div className=" flex items-center gap-4">
      <Input />
      <Button variant="outline">Go</Button>
    </div>
  );
};

export default SearchBar;
