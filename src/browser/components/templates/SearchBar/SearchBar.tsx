import { FC, useEffect } from "react";
import { Button, Input, Typography } from "@/shared/ui";
import { tabsActor } from "@/xstate/tabsMachine";
import { useSelector } from "@xstate/react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchBarFormSchema, searchBarSchema } from "@/interfaces/tab";
import debug from "debug";

const logger = debug("browser:SearchBar");

const proxyResolver = zodResolver(searchBarSchema);

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = () => {
  const activeTab = useSelector(tabsActor, (state) => state.context.activeTab);
  logger("activeTab:", activeTab);

  const {
    // reset: searchBarReset,
    // clearErrors: searchBarClearErrors,
    // setError: searchBarSetError,
    handleSubmit: searchBarHandleSubmit,
    control: searchBarControl,
    formState: { errors: searchBarErrors },
    setValue: searchBarSetValue,
  } = useForm<SearchBarFormSchema>({
    resolver: proxyResolver,
  });

  const watchedAddress = useWatch({
    control: searchBarControl,
    name: "address",
  });

  useEffect(() => {
    if (!activeTab) return;
    const url = tabsActor.getSnapshot().context.tabs[activeTab].url;
    logger("url", url);
    searchBarSetValue("address", url);
  }, [activeTab, searchBarSetValue]);

  useEffect(() => {
    if (!activeTab) return;
    logger("watchedAddress:", watchedAddress);
    tabsActor.send({
      type: "update",
      updatedTab: { id: activeTab, url: watchedAddress },
    });
  }, [watchedAddress, activeTab]);

  const searchBarOnSubmit = async ({ address }: SearchBarFormSchema) => {
    logger("address", address);
  };

  return (
    <form
      onSubmit={searchBarHandleSubmit(searchBarOnSubmit)}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center gap-4">
        <Controller
          name="address"
          control={searchBarControl}
          defaultValue={""}
          render={({ field: { onChange, value, name, ref } }) => (
            <Input
              placeholder=""
              maxLength={2048}
              id="address"
              type="text"
              name={name}
              value={value}
              onChange={onChange}
              ref={ref}
            />
          )}
        />
        <Button variant="outline">Go</Button>
      </div>
      {searchBarErrors.address && (
        <Typography variant="small" color="error">
          {searchBarErrors.address.message}
        </Typography>
      )}
    </form>
  );
};

export default SearchBar;
