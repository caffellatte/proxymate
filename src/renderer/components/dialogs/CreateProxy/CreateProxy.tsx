import { DialogContent } from "@/renderer/components/ui";
import { useEffect, FC, SetStateAction, Dispatch } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  proxySchema as proxyCreateSchema,
  ProxyFormSchema as ProxyCreateFormSchema,
} from "@/types";
import { ProxyForm } from "@/renderer/components/templates";

const proxyCreateResolver = zodResolver(proxyCreateSchema);

interface ICreateProxyProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateProxy: FC<ICreateProxyProps> = ({ setOpen }) => {
  const {
    reset: proxyCreateReset,
    clearErrors: proxyCreateClearErrors,
    handleSubmit: proxyCreateHandleSubmit,
    setError: proxyCreateSetError,
    control: proxyCreateControl,
    formState: { errors: proxyCreateErrors },
  } = useForm<ProxyCreateFormSchema>({
    resolver: proxyCreateResolver,
  });

  const watchedAuthentication = useWatch({
    control: proxyCreateControl,
    name: "authentication.authentication",
  });

  useEffect(() => {
    if (
      proxyCreateErrors.authentication?.username ||
      proxyCreateErrors.authentication?.password
    ) {
      if (!watchedAuthentication) {
        proxyCreateClearErrors("authentication");
      }
    }
  }, [
    watchedAuthentication,
    proxyCreateErrors.authentication?.username,
    proxyCreateErrors.authentication?.password,
    proxyCreateClearErrors,
  ]);

  // TODO: mayby add for `authentication.authentication = false` case
  // useEffect(() => {
  //   if (!watchedAuthentication) {
  //     proxySetValue("authentication.authentication", false);
  //     proxySetValue("authentication.username", "");
  //     proxySetValue("authentication.password", "");
  //   }
  // }, [watchedAuthentication, proxySetValue]);

  const proxyCreateOnSubmit = async ({
    name,
    description,
    port,
    proxy_host,
    proxy_port,
    authentication,
  }: ProxyCreateFormSchema) => {
    // console.log(
    //   name,
    //   description,
    //   port,
    //   proxy_host,
    //   proxy_port,
    //   authentication,
    // );
    proxyCreateClearErrors("proxyError");
    try {
      const proxy = {
        name: name,
        description: description,
        port: port as number,
        proxy_host: proxy_host,
        proxy_port: proxy_port as number,
        authentication: authentication,
      };
      const response = await window.electronAPI.proxyCreate(proxy);
      // console.log(response);
      proxyCreateReset();
      if (response) {
        setOpen(false);
      }
    } catch (error) {
      proxyCreateSetError("proxyError", {
        type: "custom",
        message: error.message,
      });
    }
  };

  return (
    <DialogContent className="max-w-[604px]">
      <ProxyForm
        title="Add Proxy"
        handleSubmit={proxyCreateHandleSubmit}
        submitHandler={proxyCreateOnSubmit}
        proxyControl={proxyCreateControl}
        proxyErrors={proxyCreateErrors}
        watchedAuthentication={watchedAuthentication}
      />
    </DialogContent>
  );
};

export default CreateProxy;
