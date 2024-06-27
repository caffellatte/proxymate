import { DialogContent, DialogClose } from "@/renderer/components/ui";
import { useEffect, FC } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  proxySchema as proxyCreateSchema,
  ProxyFormSchema as ProxyCreateFormSchema,
} from "@/types";
import { ProxyForm } from "@/renderer/components/templates";
import { uiActor } from "@/xstate";

const proxyCreateResolver = zodResolver(proxyCreateSchema);

const CreateProxy: FC = () => {
  /**
   * TODO: rename functions (remove `Create`)
   */
  const {
    reset: proxyCreateReset,
    clearErrors: proxyCreateClearErrors,
    handleSubmit: proxyCreateHandleSubmit,
    setError: proxyCreateSetError,
    control: proxyCreateControl,
    formState: { errors: proxyCreateErrors },
    setValue: proxySetValue,
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

  useEffect(() => {
    if (!watchedAuthentication) {
      proxySetValue("authentication.authentication", false);
      proxySetValue("authentication.username", "");
      proxySetValue("authentication.password", "");
    }
  }, [watchedAuthentication, proxySetValue]);

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
        uiActor.send({ type: "list" });
      }
    } catch (error) {
      proxyCreateSetError("proxyError", {
        type: "custom",
        message: error.message,
      });
    }
  };

  return (
    <DialogContent
      onInteractOutside={() => {
        uiActor.send({ type: "list" });
      }}
      className="max-w-[604px]"
    >
      <ProxyForm
        title="Add Proxy"
        handleSubmit={proxyCreateHandleSubmit}
        submitHandler={proxyCreateOnSubmit}
        proxyControl={proxyCreateControl}
        proxyErrors={proxyCreateErrors}
        watchedAuthentication={watchedAuthentication}
      />
      <DialogClose
        onClick={() => {
          uiActor.send({ type: "list" });
        }}
      />
    </DialogContent>
  );
};

export default CreateProxy;
