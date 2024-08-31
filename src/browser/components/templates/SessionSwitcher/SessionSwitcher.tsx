import { FC, useState } from "react";

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

const groups = [
  {
    label: "Persistent",
    sessions: [
      {
        label: "Session One",
        value: "1",
      },
    ],
  },
  {
    label: "In-Memory",
    sessions: [
      {
        label: "Session Two",
        value: "2",
      },
      {
        label: "Session Three",
        value: "3",
      },
    ],
  },
];

type Session = (typeof groups)[number]["sessions"][number];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISessionSwitcherProps extends PopoverTriggerProps {}

const SessionSwitcher: FC<ISessionSwitcherProps> = ({ className }) => {
  const [open, setOpen] = useState(false);
  const [showNewSessionDialog, setShowNewSessionDialog] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session>(
    groups[0].sessions[0]
  );

  return (
    <Dialog open={showNewSessionDialog} onOpenChange={setShowNewSessionDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a session"
            className={cn("w-[200px] justify-between", className)}
          >
            <Avatar className="mr-2 h-5 w-5">
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedSession.value}.png`}
                alt={selectedSession.label}
                className="grayscale"
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {selectedSession.label}
            <ChevronsUpDownIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search session..." />
            <CommandList>
              <CommandEmpty>No team found.</CommandEmpty>
              {groups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.sessions.map((session) => (
                    <CommandItem
                      key={session.value}
                      onSelect={() => {
                        setSelectedSession(session);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${session.value}.png`}
                          alt={session.label}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {session.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedSession.value === session.value
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
                      setOpen(false);
                      setShowNewSessionDialog(true);
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
      <DialogContent>
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
            onClick={() => setShowNewSessionDialog(false)}
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
