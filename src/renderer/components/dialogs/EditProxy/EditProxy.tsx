import { DialogContent, DialogClose } from "@/renderer/components/ui";
import { useEffect, FC } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Protocol, proxySchema, ProxyFormSchema, isKey } from "@/types";
import { ProxyForm } from "@/renderer/components/templates";
import { uiActor, proxiesActor } from "@/xstate";
import { useSelector } from "@xstate/react";
import debug from "debug";
const logger = debug("renderer:dialogs:EditProxy");

const proxyResolver = zodResolver(proxySchema);

const EditProxy: FC = () => {
  const proxyId = useSelector(uiActor, (state) => state.context.proxyId);
  const state = useSelector(uiActor, (state) => state);
  const proxies = useSelector(proxiesActor, (state) => state.context.proxies);
  const isEditDialogOpen = state.matches("edit");

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
    if (proxyId && isEditDialogOpen) {
      logger("proxyId:", proxyId);
      // const _proxy = proxies
      //   .find((proxy) => {
      //     console.log(proxy);
      //     return proxy.id === `proxy-${proxyId}`;
      //   })
      //   ?.getSnapshot().context;
      // logger(JSON.stringify(_proxy));
      window.electronAPI.proxyGet(proxyId).then((data) => {
        const { authentication, ...rest } = data;

        logger(data);

        const keys = Object.keys(rest);

        keys.forEach((key) => {
          if (isKey(rest, key)) {
            if (rest[key] && key !== "created" && key !== "updated") {
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
  }, [proxyId, proxySetValue, isEditDialogOpen]);

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
    proxy_protocol,
    proxy_host,
    proxy_port,
    authentication,
  }: ProxyFormSchema) => {
    if (!proxyId) return;
    // console.log(
    //   name,
    //   description,
    //   port,
    //   proxy_host,
    //   proxy_port,
    //   authentication,
    // );
    proxyEditClearErrors("proxyError");
    const created = proxies
      .find((proxy) => {
        console.log(proxy);
        return proxy.id === `proxy-${proxyId}`;
      })
      ?.getSnapshot().context.created;
    try {
      const proxy = {
        name: name,
        description: description,
        port: port as number,
        proxy_protocol: proxy_protocol as Protocol,
        proxy_host: proxy_host,
        proxy_port: proxy_port as number,
        authentication: authentication,
        created: created as number,
        updated: new Date().getTime(),
      };
      const response = await window.electronAPI.proxyEdit(proxyId, proxy);
      // console.log(response);
      proxyEditReset({
        name: "",
        description: "",
        port: "",
        proxy_host: "",
        proxy_port: "",
        proxy_protocol: "",
        authentication: {
          authentication: false,
          username: "",
          password: "",
        },
      });
      if (response) {
        // TODO: communication between actors
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
