import { DialogContent } from "@/renderer/components/ui";
import { useEffect, FC, SetStateAction, Dispatch } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { proxySchema, ProxyFormSchema, isKey } from "@/types";
import { ProxyForm } from "@/renderer/components/templates";

const proxyCreateResolver = zodResolver(proxySchema);

interface ICreateProxyProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedForEditProxy: string | null;
}

const EditProxy: FC<ICreateProxyProps> = ({
  setOpen,
  selectedForEditProxy,
}) => {
  console.log(selectedForEditProxy);

  const {
    reset: proxyEditReset,
    clearErrors: proxyEditClearErrors,
    handleSubmit: proxyEditHandleSubmit,
    setError: proxyEditSetError,
    control: proxyEditControl,
    formState: { errors: proxyEditErrors },
    setValue: proxySetValue,
  } = useForm<ProxyFormSchema>({
    resolver: proxyCreateResolver,
  });

  const watchedAuthentication = useWatch({
    control: proxyEditControl,
    name: "authentication.authentication",
  });

  useEffect(() => {
    if (selectedForEditProxy !== null) {
      console.log("selectedForEditProxy:", selectedForEditProxy);
      window.electronAPI.proxyGet(selectedForEditProxy).then((data) => {
        const { authentication, ...rest } = data;

        console.log(data);

        const keys = Object.keys(rest);

        keys.forEach((key) => {
          if (isKey(rest, key)) {
            if (rest[key]) {
              console.log("kkey:", key);
              console.log("rest[key]", rest[key]);
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
  }, [selectedForEditProxy, proxySetValue]);

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
      const response = await window.electronAPI.proxyEdit(
        selectedForEditProxy,
        proxy
      );
      // console.log(response);
      proxyEditReset();
      if (response) {
        setOpen(false);
      }
    } catch (error) {
      proxyEditSetError("proxyError", {
        type: "custom",
        message: error.message,
      });
    }
  };

  return (
    <DialogContent className="max-w-[604px]">
      <ProxyForm
        title="Edit Proxy"
        handleSubmit={proxyEditHandleSubmit}
        submitHandler={proxyEditOnSubmit}
        proxyControl={proxyEditControl}
        proxyErrors={proxyEditErrors}
        watchedAuthentication={watchedAuthentication}
      />
    </DialogContent>
  );
};

export default EditProxy;
