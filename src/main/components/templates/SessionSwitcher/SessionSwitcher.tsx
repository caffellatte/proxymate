import { FC, useEffect, useMemo } from "react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui";

import debug from "debug";
import { ISession } from "@/interfaces";

const logger = debug("browser:SessionSwitcher");

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISessionSwitcherProps extends PopoverTriggerProps {}

const SessionSwitcher: FC<ISessionSwitcherProps> = ({ className }) => {
  const sessionActorState = useSelector(sessionActor, (state) => state);
  const isMenuOpen = sessionActorState.matches("menu");
  const isCreateOpen = sessionActorState.matches("createSessionDialog");
  const selectedSession = useSelector(
    sessionActor,
    (state) => state.context.selectedSession
  );
  const sessions = useSelector(sessionActor, (state) => state.context.sessions);

  logger("state sessions:", sessions);

  const groups = useMemo(() => {
    const sessionsArray = Object.keys(sessions).map(
      (session) => sessions[session]
    );
    const data = sessionsArray.reduce(
      (acc, currentValue) => {
        if (acc.length > 0) {
          const group = acc.find((group) => {
            if (group.label === currentValue.type) {
              return group;
            }
          });
          const otherGroups = acc.filter((group) => {
            if (group.label !== currentValue.type) {
              return group;
            }
          });
          if (group) {
            group.sessions.push(currentValue);
            return otherGroups.concat(group);
          } else {
            const currentGroup = {
              label: currentValue.type,
              sessions: [currentValue],
            };
            otherGroups.push(currentGroup);
            return otherGroups;
          }
        } else {
          const group = {
            label: currentValue.type,
            sessions: [currentValue],
          };
          acc.push(group);
          return acc;
        }
      },
      [] as {
        label: string;
        sessions: ISession[];
      }[]
    );
    return data;
  }, [sessions]);

  useEffect(() => {
    window.electronAPI.sessionGetAll().then((data) => {
      logger("sessionGetAll data:", data);
      data.forEach((session) => {
        sessionActor.send({ type: "add", session: session[1] });
      });
    });
  }, []);

  useEffect(() => {
    logger("groups:", groups);
    if (groups[0]?.sessions?.[0]) {
      sessionActor.send({
        type: "select",
        session: groups[0].sessions[groups[0].sessions.length - 1],
      });
    }
  }, [groups]);

  return (
    <>
      {selectedSession && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
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
                      <CommandItem
                        onSelect={() => {
                          logger("create");

                          sessionActor.send({ type: "createSessionDialog" });
                        }}
                      >
                        <PlusCircleIcon className="mr-2 h-5 w-5" />
                        Create Session
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <Button
              variant="ghost"
              onClick={() => {
                window.electronAPI
                  .sessionDelete(selectedSession.id)
                  .then((sessionId) => {
                    sessionActor.send({ type: "delete", id: sessionId });
                  });
              }}
            >
              Delete session
            </Button>
          </div>
          <Button
            variant="secondary"
            onClick={() => {
              window.electronAPI.windowOpen(selectedSession);
              logger("browser:openWindow, with session:", selectedSession);
            }}
          >
            Open browser
          </Button>
        </div>
      )}
    </>
  );
};

export default SessionSwitcher;
