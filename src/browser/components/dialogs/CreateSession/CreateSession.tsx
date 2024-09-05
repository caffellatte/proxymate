import { FC } from "react";
import { sessionActor } from "@/xstate";

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
} from "@/shared/ui";

const CreateSession: FC = () => {
  return (
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
  );
};

export default CreateSession;
