import { FC } from "react";
import {
  Button,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Input,
  Label,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Switch,
  Textarea,
  Typography,
} from "@/renderer/components/ui";
import {
  Controller,
  UseFormHandleSubmit,
  Control,
  FieldErrors,
} from "react-hook-form";
import { ProxyFormSchema, proxyProtocols } from "@/types";

interface IProxyFormProps {
  title: string;
  handleSubmit: UseFormHandleSubmit<ProxyFormSchema, undefined>;
  submitHandler: ({
    name,
    description,
    port,
    proxy_host,
    proxy_port,
    authentication,
  }: ProxyFormSchema) => Promise<void>;
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  proxyControl: Control<ProxyFormSchema, any>;
  proxyErrors: FieldErrors<ProxyFormSchema>;
  watchedAuthentication: boolean;
}

const ProxyForm: FC<IProxyFormProps> = ({
  title,
  handleSubmit,
  submitHandler,
  proxyControl,
  proxyErrors,
  watchedAuthentication,
}) => {
  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-4"
    >
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
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
              control={proxyControl}
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
          {proxyErrors.name && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div></div>
              <Typography variant="small" color="error" className="col-span-3">
                {proxyErrors.name.message}
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
              control={proxyControl}
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
          {proxyErrors.description && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div></div>
              <Typography variant="small" color="error" className="col-span-3">
                {proxyErrors.description.message}
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
              control={proxyControl}
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
          {proxyErrors.port && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div></div>
              <Typography variant="small" color="error" className="col-span-3">
                {proxyErrors.port.message}
              </Typography>
            </div>
          )}
        </div>
        {/* Protocol */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="proxy_protocol" className="text-right">
              Proxy protocol
            </Label>
            <Controller
              name="proxy_protocol"
              control={proxyControl}
              defaultValue={undefined}
              render={({ field: { onChange, value, name } }) => (
                <Select onValueChange={onChange} value={value} name={name}>
                  <SelectTrigger
                    id="proxy_protocol"
                    aria-label="proxy_protocol"
                    className="col-span-3"
                  >
                    <SelectValue placeholder="Proxy protocol" />
                  </SelectTrigger>
                  <SelectContent>
                    {proxyProtocols.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {proxyErrors.proxy_protocol && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div></div>
              <Typography variant="small" color="error" className="col-span-3">
                {proxyErrors.proxy_protocol.message}
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
              control={proxyControl}
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
          {proxyErrors.proxy_host && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div></div>
              <Typography variant="small" color="error" className="col-span-3">
                {proxyErrors.proxy_host.message}
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
              control={proxyControl}
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
          {proxyErrors.proxy_port && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div></div>
              <Typography variant="small" color="error" className="col-span-3">
                {proxyErrors.proxy_port.message}
              </Typography>
            </div>
          )}
        </div>
        {/* Authentication */}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="authentication.authentication" className="text-right">
            Authentication
          </Label>
          <Controller
            name="authentication.authentication"
            control={proxyControl}
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
              control={proxyControl}
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
          {proxyErrors.authentication?.username && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div></div>
              <Typography variant="small" color="error" className="col-span-3">
                {proxyErrors.authentication?.username.message}
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
              control={proxyControl}
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
          {proxyErrors.authentication?.password && (
            <div className="grid grid-cols-4 items-center gap-4">
              <div></div>
              <Typography variant="small" color="error" className="col-span-3">
                {proxyErrors.authentication?.password.message}
              </Typography>
            </div>
          )}
        </div>
      </div>
      {proxyErrors.proxyError && (
        <Typography variant="small" color="error">
          {proxyErrors.proxyError.message}
        </Typography>
      )}
      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
};

export default ProxyForm;
