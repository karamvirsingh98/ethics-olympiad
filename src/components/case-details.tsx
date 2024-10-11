"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useAction } from "next-safe-action/hooks";
import { AddOrUpdateCaseAction, AddOrUpdateQuestion } from "@/lib/actions";
import { useState } from "react";
import { InferSelectModel } from "drizzle-orm";
import { CasesTable, QuestionsTable } from "@/lib/schema";

export const CaseDetails = ({
  details,
  question,
}: {
  details: InferSelectModel<typeof CasesTable>;
  question: InferSelectModel<typeof QuestionsTable> | undefined;
}) => {
  const [open, setOpen] = useState(false);

  const [content, setContent] = useState("");
  const [text, setText] = useState("");

  const reset = () => {
    setOpen(false);
    setContent("");
    setText("");
  };

  const upd_case = useAction(AddOrUpdateCaseAction, { onSuccess: reset });
  const upd_question = useAction(AddOrUpdateQuestion, { onSuccess: reset });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="p-4 border rounded-md flex flex-col items-start justify-between gap-4 hover:-translate-y-1 hover:bg-accent/25 transition-all">
        <div className="text-lg font-bold text-start">{details.title}</div>
        <p className="text-sm text-muted-foreground">{details.level} Level</p>
      </DialogTrigger>
      <DialogContent className="max-w-[60vw]">
        <DialogHeader>
          <DialogTitle>Case Details</DialogTitle>
        </DialogHeader>
        <div className="py-8 flex flex-col gap-4">
          <p className="px-2 text-2xl">{details.title}</p>
          <div className="p-2 pl-4 border rounded-md bg-border/25">
            <Textarea
              className="text-lg h-[40vh] overflow-y-scroll border-none p-0 pr-4 focus-visible:ring-0"
              value={content || details.content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="px-2">
            <p className="text-muted-foreground">Question:</p>
            <Input
              value={text || question?.text || ""}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              if (content) upd_case.execute({ ...details, content });
              if (text)
                upd_question.execute(
                  question
                    ? { ...question, text }
                    : { caseId: details.id, text }
                );
            }}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
