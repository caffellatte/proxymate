import { Button, Input } from "@/renderer/components/ui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { proxyCreateSchema, ProxyCreateFormSchema } from "@/types";

const proxyCreateResolver = zodResolver(proxyCreateSchema);

const CreateProxy = () => {
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

  const proxyCreateOnSubmit = async ({
    name,
    description,
    host,
    ports,
    username,
    password,
  }: ProxyCreateFormSchema) => {
    console.log(name, description, host, ports, username, password);
    proxyCreateClearErrors("proxyCreateError");
    try {
      // proxyCreate.({ name, description, host, ports, username, password });
      proxyCreateReset();
    } catch (e) {
      proxyCreateSetError("proxyCreateError", {
        type: "custom",
        message: "Proxy Create error",
      });
    }
  };

  return (
    <div>
      CreateProxy
      <form onSubmit={proxyCreateHandleSubmit(proxyCreateOnSubmit)}>
        <div>
          <Controller
            name="name"
            control={proxyCreateControl}
            defaultValue={""}
            render={({ field: { onChange, value, name, ref } }) => (
              <Input
                placeholder="name"
                maxLength={36}
                id="name"
                type="text"
                name={name}
                value={value}
                onChange={onChange}
                ref={ref}
              />
            )}
          />
          {proxyCreateErrors.name && <p>{proxyCreateErrors.name.message}</p>}
        </div>
        {proxyCreateErrors.host && <p>{proxyCreateErrors.host.message}</p>}
        <Button>Test</Button>
      </form>
    </div>
  );
};

export default CreateProxy;
