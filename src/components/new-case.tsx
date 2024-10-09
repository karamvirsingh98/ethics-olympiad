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
import { AddOrUpdateCaseAction } from "@/lib/actions";
import { Textarea } from "./ui/textarea";
import { LevelSelector } from "./level-selector";
import { zOlympiadLevel } from "@/lib/entities";

export const NewCase = () => {
  const [open, setOpen] = useState(false);

  const [{ title, content }, setState] = useState({ title: "", content: "" });
  const [level, setLevel] = useState<zOlympiadLevel>();

  const { execute, isPending } = useAction(AddOrUpdateCaseAction, {
    onSettled: () => {
      setState({ title: "", content: "" });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={isPending}>
        <Button>
          New Case <PlusCircledIcon className="w-4 ml-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Case</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-4">
          <div>
            <p className="pb-1">Case Name</p>
            <Input
              value={title}
              onChange={(e) =>
                setState((s) => ({ ...s, title: e.target.value }))
              }
            />
          </div>
          <div>
            <p className="pb-1">Case Content</p>
            <Textarea
              value={content}
              className="h-[500px]"
              onChange={(e) =>
                setState((s) => ({ ...s, content: e.target.value }))
              }
            />
          </div>
          <div>
            <p className="pb-1">Template Level</p>
            <LevelSelector value={level} onChange={setLevel} />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="gap-4"
            disabled={isPending}
            onClick={() =>
              level && execute({ userId: 0, title, content, level })
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
