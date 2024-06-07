import {
  Button,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Label,
  Typography,
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

  console.log(proxyCreateErrors);

  return (
    <DialogContent className="max-w-[480px]">
      <form onSubmit={proxyCreateHandleSubmit(proxyCreateOnSubmit)}>
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
              <Typography variant="small" color="error">
                {proxyCreateErrors.name.message}
              </Typography>
            )}
          </div>
          {/* Description */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Controller
                name="description"
                control={proxyCreateControl}
                defaultValue={""}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Input
                    placeholder="Proxy description"
                    maxLength={120}
                    id="description"
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
            {proxyCreateErrors.description && (
              <Typography variant="small" color="error">
                {proxyCreateErrors.description.message}
              </Typography>
            )}
          </div>
          {/* Host */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Host
              </Label>
              <Controller
                name="host"
                control={proxyCreateControl}
                defaultValue={""}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Input
                    placeholder="Proxy host"
                    maxLength={120}
                    id="host"
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
            {proxyCreateErrors.host && (
              <Typography variant="small" color="error">
                {proxyCreateErrors.host.message}
              </Typography>
            )}
          </div>
          {/* HTTP port */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ports.port_http" className="text-right">
                HTTP Port
              </Label>
              <Controller
                name="ports.port_http"
                control={proxyCreateControl}
                defaultValue={NaN}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Input
                    placeholder="Proxy HTTP port"
                    maxLength={5}
                    id="ports.port_http"
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

            {proxyCreateErrors.ports?.port_http && (
              <Typography variant="small" color="error">
                {proxyCreateErrors.ports.port_http.message}
              </Typography>
            )}
          </div>
          {/* SOCKS5 port */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="port_socks" className="text-right">
                SOCKS5 Port
              </Label>
              <Controller
                name="ports.port_socks"
                control={proxyCreateControl}
                defaultValue={NaN}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Input
                    placeholder="Proxy SOCKS5 port"
                    maxLength={5}
                    id="port_socks"
                    type="text"
                    name={name}
                    value={value}
                    onChange={(event) =>
                      onChange?.(parseInt(event.target.value, 10))
                    }
                    // onChange={onChange}
                    ref={ref}
                    className="col-span-3"
                  />
                )}
              />
            </div>
            {proxyCreateErrors.ports && (
              <Typography variant="small" color="error">
                {proxyCreateErrors.ports.message}
              </Typography>
            )}
            {proxyCreateErrors.ports?.port_socks && (
              <Typography variant="small" color="error">
                {proxyCreateErrors.ports.port_socks.message}
              </Typography>
            )}
          </div>
          {/* Username */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Controller
                name="username"
                control={proxyCreateControl}
                defaultValue={""}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Input
                    placeholder="Proxy username"
                    maxLength={120}
                    id="username"
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
            {proxyCreateErrors.username && (
              <Typography variant="small" color="error">
                {proxyCreateErrors.username.message}
              </Typography>
            )}
          </div>
          {/* Password */}
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Username
              </Label>
              <Controller
                name="password"
                control={proxyCreateControl}
                defaultValue={""}
                render={({ field: { onChange, value, name, ref } }) => (
                  <Input
                    placeholder="Proxy password"
                    maxLength={120}
                    id="password"
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
            {proxyCreateErrors.username && (
              <Typography variant="small" color="error">
                {proxyCreateErrors.username.message}
              </Typography>
            )}
          </div>
        </div>
        {proxyCreateErrors.proxyCreateError && (
          <Typography variant="small" color="error">
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
