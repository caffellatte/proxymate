import { FC } from "react";
import { sessionActor } from "@/xstate";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ISession,
  SessionType,
  sessionSchema as sessionCreateSchema,
  SessionFormSchema as SessionCreateFormSchema,
} from "@/interfaces";

const proxyResolver = zodResolver(sessionCreateSchema);

import {
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Typography,
} from "@/shared/ui";

import debug from "debug";

const logger = debug("browser:CreateSession");

const CreateSession: FC = () => {
  const {
    reset: sessionCreateReset,
    // clearErrors: sessionCreateClearErrors,
    handleSubmit: sessionCreateHandleSubmit,
    setError: sessionCreateSetError,
    control: sessionCreateControl,
    formState: { errors: sessionCreateErrors },
    // setValue: sessionSetValue,
  } = useForm<SessionCreateFormSchema>({
    resolver: proxyResolver,
  });

  const sessionCreateOnSubmit = async ({
    name,
    type,
  }: SessionCreateFormSchema) => {
    logger("name:", name);
    logger("type:", type);
    try {
      const session: Omit<ISession, "id"> = {
        name: name,
        type: type as SessionType,
      };

      const createdSession = await window.electronAPI.sessionCreate(session);
      // console.log(response);
      sessionCreateReset({
        name: "",
        type: "",
      });
      if (createdSession) {
        logger(createdSession);
        sessionActor.send({ type: "add", session: createdSession });
        sessionActor.send({ type: "idle" });
      }
    } catch (error) {
      sessionCreateSetError("sessionError", {
        type: "custom",
        message: error.message,
      });
    }
  };

  return (
    <DialogContent
      onInteractOutside={() => {
        sessionActor.send({ type: "idle" });
      }}
    >
      <form onSubmit={sessionCreateHandleSubmit(sessionCreateOnSubmit)}>
        <DialogHeader>
          <DialogTitle>Create session</DialogTitle>
          <DialogDescription>
            Add a new session to use in browser.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Session name</Label>
              <div className="flex flex-col gap-2">
                <Controller
                  name="name"
                  control={sessionCreateControl}
                  defaultValue={""}
                  render={({ field: { onChange, value, name, ref } }) => (
                    <Input
                      placeholder="Session name"
                      maxLength={96}
                      id="name"
                      type="text"
                      name={name}
                      value={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  )}
                />
                {sessionCreateErrors.name && (
                  <Typography variant="small" color="error">
                    {sessionCreateErrors.name.message}
                  </Typography>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Session type</Label>
              <div className="flex flex-col gap-2">
                <Controller
                  name="type"
                  control={sessionCreateControl}
                  defaultValue={""}
                  render={({ field: { onChange, value, name } }) => (
                    <Select onValueChange={onChange} value={value} name={name}>
                      <SelectTrigger id="type" aria-label="type">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="persistent">
                          <span className="font-medium">Persistent</span> -{" "}
                          <span className="text-muted-foreground">
                            Saved on disk
                          </span>
                        </SelectItem>
                        <SelectItem value="inmemory">
                          <span className="font-medium">In-memory</span> -{" "}
                          <span className="text-muted-foreground">
                            Stored in RAM
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {sessionCreateErrors.type && (
                  <Typography variant="small" color="error">
                    {sessionCreateErrors.type.message}
                  </Typography>
                )}
                {sessionCreateErrors.sessionError && (
                  <Typography variant="small" color="error">
                    {sessionCreateErrors.sessionError.message}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              sessionActor.send({ type: "idle" });
            }}
          >
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default CreateSession;
