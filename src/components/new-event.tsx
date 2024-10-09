"use client";

import {
  CheckCircledIcon,
  PlusCircledIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { CreateEventAction } from "@/lib/actions";

export const NewEvent = ({ templateId }: { templateId: number }) => {
  const [open, setOpen] = useState(false);

  const [{ title, password }, setState] = useState({ title: "", password: "" });

  const { execute, isPending } = useAction(CreateEventAction, {
    onSettled: () => {
      setState({ title: "", password: "" });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={isPending}>
        <Button>
          New Event <PlusCircledIcon className="w-4 ml-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-4">
          <div>
            <p className="pb-1">Event Name</p>
            <Input
              value={title}
              onChange={(e) =>
                setState((s) => ({ ...s, title: e.target.value }))
              }
            />
          </div>
          <div>
            <p className="pb-1">Event Password</p>
            <Input
              value={password}
              onChange={(e) =>
                setState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="gap-4"
            disabled={isPending}
            onClick={() =>
              execute({
                templateId,
                title,
                password,
                teams: [],
                timers: [3, 5, 1, 3, 1, 3, 7],
              })
            }
          >
            Submit
            {isPending ? (
              <ReloadIcon className="w-4 animate-spin" />
            ) : (
              <CheckCircledIcon className="w-4" />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
