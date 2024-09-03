import { FC, useEffect } from "react";
import { sessionActor } from "@/xstate";
import { useSelector } from "@xstate/react";

import { ChevronsUpDownIcon, CheckIcon, PlusCircleIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

import debug from "debug";
const logger = debug("browser:SessionSwitcher");

const groups = [
  {
    label: "Persistent",
    sessions: [
      {
        id: 1,
        name: "Session One",
      },
    ],
  },
  {
    label: "In-Memory",
    sessions: [
      {
        id: 2,
        name: "Session Two",
      },
      {
        id: 3,
        name: "Session Three",
      },
    ],
  },
];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISessionSwitcherProps extends PopoverTriggerProps {}

const SessionSwitcher: FC<ISessionSwitcherProps> = ({ className }) => {
  const sessionActorState = useSelector(sessionActor, (state) => state);
  const isMenuOpen = sessionActorState.matches("menu");
  const isCreateOpen = sessionActorState.matches("create");
  const selectedSession = useSelector(
    sessionActor,
    (state) => state.context.selectedSession
  );

  useEffect(() => {
    sessionActor.send({ type: "select", session: groups[0].sessions[0] });
  }, []);

  return (
    <Dialog open={isCreateOpen}>
      {selectedSession && (
        <Popover open={isMenuOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isMenuOpen}
              aria-label="Select a session"
              className={cn("w-[200px] justify-between", className)}
              onClick={() => {
                sessionActor.send({ type: "menu" });
              }}
            >
              <Avatar className="mr-2 h-5 w-5">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${selectedSession.id}.png`}
                  alt={selectedSession.name}
                  className="grayscale"
                />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
              {selectedSession.name}
              <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-[200px] p-0"
            onInteractOutside={() => {
              if (!isCreateOpen) {
                sessionActor.send({ type: "idle" });
              }
            }}
          >
            <Command>
              <CommandInput placeholder="Search session..." />
              <CommandList>
                <CommandEmpty>No team found.</CommandEmpty>
                {groups.map((group) => (
                  <CommandGroup key={group.label} heading={group.label}>
                    {group.sessions.map((session) => (
                      <CommandItem
                        key={session.id}
                        onSelect={() => {
                          sessionActor.send({
                            type: "select",
                            session: session,
                          });
                        }}
                        className="text-sm"
                      >
                        <Avatar className="mr-2 h-5 w-5">
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${session.id}.png`}
                            alt={session.name}
                            className="grayscale"
                          />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        {session.name}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            selectedSession.id === session.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </CommandList>
              <CommandSeparator />
              <CommandList>
                <CommandGroup>
                  <DialogTrigger asChild>
                    <CommandItem
                      onSelect={() => {
                        logger("create");

                        sessionActor.send({ type: "create" });
                      }}
                    >
                      <PlusCircleIcon className="mr-2 h-5 w-5" />
                      Create Session
                    </CommandItem>
                  </DialogTrigger>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )}
      <DialogContent
        onInteractOutside={() => {
          sessionActor.send({ type: "idle" });
        }}
      >
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
              <Input id="name" placeholder="Session One" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Session type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="persistent">
                    <span className="font-medium">Persistent</span> -{" "}
                    <span className="text-muted-foreground">Saved on disk</span>
                  </SelectItem>
                  <SelectItem value="inmemory">
                    <span className="font-medium">In-memory</span> -{" "}
                    <span className="text-muted-foreground">Stored in RAM</span>
                  </SelectItem>
                </SelectContent>
              </Select>
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
      </DialogContent>
    </Dialog>
  );
};

export default SessionSwitcher;
