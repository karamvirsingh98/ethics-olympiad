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
import { CreateTemplateAction } from "@/lib/actions";
import { LevelSelector } from "./level-selector";
import { zOlympiadLevel } from "@/lib/entities";

export const NewTemplate = () => {
  const [open, setOpen] = useState(false);

  const [title, setState] = useState("");
  const [level, setLevel] = useState<zOlympiadLevel>();

  const { execute, isPending } = useAction(CreateTemplateAction, {
    onSettled: () => {
      setState("");
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={isPending}>
        <Button>
          New Template <PlusCircledIcon className="w-4 ml-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Template</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-4">
          <div>
            <p className="pb-1">Template Name</p>
            <Input value={title} onChange={(e) => setState(e.target.value)} />
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
            onClick={() => !!level && execute({ title, level, heats: [] })}
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
