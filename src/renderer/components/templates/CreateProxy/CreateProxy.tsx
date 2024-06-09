import {
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Label,
  Switch,
  Textarea,
  Typography,
} from "@/renderer/components/ui";
import { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
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

  console.log(proxyCreateErrors);

  return (
    <DialogContent className="max-w-[604px]">
      <form
        onSubmit={proxyCreateHandleSubmit(proxyCreateOnSubmit)}
        className="flex flex-col gap-4"
      >
        <DialogHeader>
          <DialogTitle>Create proxy</DialogTitle>
          <DialogDescription>
            {"Create new proxy here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Name */}
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
                    placeholder="Proxy name"
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
              <div className="grid grid-cols-4 items-center gap-4">
                <div></div>
                <Typography
                  variant="small"
                  color="error"
                  className="col-span-3"
                >
                  {proxyCreateErrors.name.message}
                </Typography>
              </div>
            )}
          </div>
          {/* Description */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description" className="text-right pt-2.5">
                Description
              </Label>
              <Controller
                name="description"
                control={proxyCreateControl}
                defaultValue={""}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Textarea
                    placeholder="Proxy description"
                    id="description"
                    name={name}
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    className="col-span-3"
                  />
                )}
              />
            </div>
            {proxyCreateErrors.description && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div></div>
                <Typography
                  variant="small"
                  color="error"
                  className="col-span-3"
                >
                  {proxyCreateErrors.description.message}
                </Typography>
              </div>
            )}
          </div>
          {/* Port */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="port" className="text-right">
                Port
              </Label>
              <Controller
                name="port"
                control={proxyCreateControl}
                defaultValue={""}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Input
                    placeholder="Port"
                    id="port"
                    type="number"
                    name={name}
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    className="col-span-3"
                  />
                )}
              />
            </div>
            {proxyCreateErrors.port && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div></div>
                <Typography
                  variant="small"
                  color="error"
                  className="col-span-3"
                >
                  {proxyCreateErrors.port.message}
                </Typography>
              </div>
            )}
          </div>
          {/* Host */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="proxy_host" className="text-right">
                Proxy host
              </Label>
              <Controller
                name="proxy_host"
                control={proxyCreateControl}
                defaultValue={""}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Input
                    placeholder="Proxy host"
                    maxLength={120}
                    id="proxy_host"
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
            {proxyCreateErrors.proxy_host && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div></div>
                <Typography
                  variant="small"
                  color="error"
                  className="col-span-3"
                >
                  {proxyCreateErrors.proxy_host.message}
                </Typography>
              </div>
            )}
          </div>
          {/* Proxy port */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="proxy_port" className="text-right">
                Proxy port
              </Label>
              <Controller
                name="proxy_port"
                control={proxyCreateControl}
                defaultValue={""}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Input
                    placeholder="Proxy port"
                    id="proxy_port"
                    type="number"
                    name={name}
                    value={value}
                    onChange={onChange}
                    ref={ref}
                    className="col-span-3"
                  />
                )}
              />
            </div>
            {proxyCreateErrors.proxy_port && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div></div>
                <Typography
                  variant="small"
                  color="error"
                  className="col-span-3"
                >
                  {proxyCreateErrors.proxy_port.message}
                </Typography>
              </div>
            )}
          </div>
          {/* Authentication */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="authentication.authentication"
              className="text-right"
            >
              Authentication
            </Label>
            <Controller
              name="authentication.authentication"
              control={proxyCreateControl}
              defaultValue={false}
              render={({ field: { onChange, value, name, ref } }) => (
                <Switch
                  id="authentication.authentication"
                  name={name}
                  checked={value}
                  value="off"
                  onCheckedChange={onChange}
                  ref={ref}
                  className="col-span-3"
                />
              )}
            />
          </div>
          {/* Username */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="authentication.username" className="text-right">
                Username
              </Label>
              <Controller
                name="authentication.username"
                control={proxyCreateControl}
                defaultValue={""}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Input
                    disabled={watchedAuthentication ? false : true}
                    placeholder="Proxy username"
                    maxLength={120}
                    id="authentication.username"
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
            {proxyCreateErrors.authentication?.username && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div></div>
                <Typography
                  variant="small"
                  color="error"
                  className="col-span-3"
                >
                  {proxyCreateErrors.authentication?.username.message}
                </Typography>
              </div>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="authentication.password" className="text-right">
                Password
              </Label>
              <Controller
                name="authentication.password"
                control={proxyCreateControl}
                defaultValue={""}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Input
                    disabled={watchedAuthentication ? false : true}
                    placeholder="Proxy password"
                    maxLength={120}
                    id="authentication.password"
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
            {proxyCreateErrors.authentication?.password && (
              <div className="grid grid-cols-4 items-center gap-4">
                <div></div>
                <Typography
                  variant="small"
                  color="error"
                  className="col-span-3"
                >
                  {proxyCreateErrors.authentication?.password.message}
                </Typography>
              </div>
            )}
          </div>
        </div>
        {proxyCreateErrors.proxyCreateError && (
          <Typography variant="small" color="error" className="text-right">
            {proxyCreateErrors.proxyCreateError.message}
          </Typography>
        )}
        <DialogFooter>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default CreateProxy;
