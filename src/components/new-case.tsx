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
import { AddOrUpdateCaseAction, AddOrUpdateQuestion } from "@/lib/actions";
import { Textarea } from "./ui/textarea";
import { LevelSelector } from "./level-selector";
import { zOlympiadLevel } from "@/lib/entities";

export const NewCase = () => {
  const [open, setOpen] = useState(false);

  const [level, setLevel] = useState<zOlympiadLevel>();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState("");

  const add_case = useAction(AddOrUpdateCaseAction);
  const add_question = useAction(AddOrUpdateQuestion);

  const pending = add_case.isPending || add_question.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={pending}>
        <Button>
          New Case <PlusCircledIcon className="w-4 ml-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[45vw]">
        <DialogHeader>
          <DialogTitle>Create New Case</DialogTitle>
        </DialogHeader>
        <div className="py-4 flex flex-col gap-4">
          <div>
            <p className="p-1 text-sm text-muted-foreground">Case Level</p>
            <LevelSelector value={level} onChange={setLevel} />
          </div>
          <div>
            <p className="p-1 text-sm text-muted-foreground">Case Name</p>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <p className="p-1 text-sm text-muted-foreground">Case Question</p>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <div>
            <p className="p-1 text-sm text-muted-foreground">Case Content</p>
            <Textarea
              value={content}
              className="h-[30vh]"
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="gap-4"
            disabled={pending}
            onClick={async () => {
              if (!level) return;
              const caseId = (
                await add_case.executeAsync({ title, content, level })
              )?.data?.id;
              if (!caseId) return;
              await add_question.executeAsync({ caseId, text: question });

              // cleanup
              setLevel(undefined);
              setTitle("");
              setQuestion("");
              setContent("");

              // close the dialog
              setOpen(false);
            }}
          >
            Submit
            {pending ? (
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
