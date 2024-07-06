import { DialogContent, DialogClose } from "@/renderer/components/ui";
import { useEffect, FC } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { proxySchema, ProxyFormSchema, isKey } from "@/types";
import { ProxyForm } from "@/renderer/components/templates";
import { uiActor, proxiesActor } from "@/xstate";
import { useSelector } from "@xstate/react";
import debug from "debug";
const logger = debug("renderer:dialogs:EditProxy");

const proxyResolver = zodResolver(proxySchema);

const EditProxy: FC = () => {
  const proxyId = useSelector(uiActor, (state) => state.context.proxyId);
  const state = useSelector(uiActor, (state) => state);

  const {
    reset: proxyEditReset,
    clearErrors: proxyEditClearErrors,
    handleSubmit: proxyEditHandleSubmit,
    setError: proxyEditSetError,
    control: proxyEditControl,
    formState: { errors: proxyEditErrors },
    setValue: proxySetValue,
  } = useForm<ProxyFormSchema>({
    resolver: proxyResolver,
  });

  const watchedAuthentication = useWatch({
    control: proxyEditControl,
    name: "authentication.authentication",
  });

  useEffect(() => {
    if (proxyId && state.matches("edit")) {
      logger("proxyId:", proxyId);
      window.electronAPI.proxyGet(proxyId).then((data) => {
        const { authentication, ...rest } = data;

        logger(data);

        const keys = Object.keys(rest);

        keys.forEach((key) => {
          if (isKey(rest, key)) {
            if (rest[key]) {
              logger("key:", key);
              logger("rest[key]", rest[key]);
              proxySetValue(key, rest[key]);
            }
          }
        });

        if (authentication.authentication) {
          proxySetValue(
            "authentication.authentication",
            authentication.authentication
          );
          proxySetValue("authentication.username", authentication.username);
          proxySetValue("authentication.password", authentication.password);
        }
      });
    }
  }, [proxyId, proxySetValue, state]);

  useEffect(() => {
    if (
      proxyEditErrors.authentication?.username ||
      proxyEditErrors.authentication?.password
    ) {
      if (!watchedAuthentication) {
        proxyEditClearErrors("authentication");
      }
    }
  }, [
    watchedAuthentication,
    proxyEditErrors.authentication?.username,
    proxyEditErrors.authentication?.password,
    proxyEditClearErrors,
  ]);

  useEffect(() => {
    if (!watchedAuthentication) {
      proxySetValue("authentication.authentication", false);
      proxySetValue("authentication.username", "");
      proxySetValue("authentication.password", "");
    }
  }, [watchedAuthentication, proxySetValue]);

  const proxyEditOnSubmit = async ({
    name,
    description,
    port,
    proxy_host,
    proxy_port,
    authentication,
  }: ProxyFormSchema) => {
    // console.log(
    //   name,
    //   description,
    //   port,
    //   proxy_host,
    //   proxy_port,
    //   authentication,
    // );
    proxyEditClearErrors("proxyError");
    try {
      const proxy = {
        name: name,
        description: description,
        port: port as number,
        proxy_host: proxy_host,
        proxy_port: proxy_port as number,
        authentication: authentication,
      };
      const response = await window.electronAPI.proxyEdit(proxyId, proxy);
      // console.log(response);
      proxyEditReset();
      if (response) {
        uiActor.send({ type: "list" });
        proxiesActor.send({
          type: "update",
          editedProxy: { id: proxyId, ...proxy },
        });
      }
    } catch (error) {
      proxyEditSetError("proxyError", {
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
        title="Edit Proxy"
        handleSubmit={proxyEditHandleSubmit}
        submitHandler={proxyEditOnSubmit}
        proxyControl={proxyEditControl}
        proxyErrors={proxyEditErrors}
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

export default EditProxy;
