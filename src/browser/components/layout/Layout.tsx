import { SearchBar, TabsBar } from "@/browser/components/templates";

const Layout = () => {
  return (
    <div className="container py-5 flex flex-col gap-4">
      <TabsBar />
      <SearchBar />
    </div>
  );
};

export default Layout;
