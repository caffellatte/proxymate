import {
  Button,
  Input,
  Label,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/renderer/components/ui";
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
    <DialogContent className="max-w-[425px]">
      <form onSubmit={proxyCreateHandleSubmit(proxyCreateOnSubmit)}>
        <DialogHeader>
          <DialogTitle>Create proxy</DialogTitle>
          <DialogDescription>
            {"Create new proxy here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
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
                    className="col-span-3"
                  />
                )}
              />
            </div>
            {proxyCreateErrors.name && (
              <p className="text-destructive">
                {proxyCreateErrors.name.message}
              </p>
            )}
          </div>
        </div>
        {proxyCreateErrors.host && (
          <p className="text-destructive">{proxyCreateErrors.host.message}</p>
        )}
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default CreateProxy;
