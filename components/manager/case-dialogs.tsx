"use client";

import {
  CheckCircle,
  Loader2,
  PencilIcon,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

import { DELETE_CASE_ACTION, UPSERT_CASE_ACTION } from "@/lib/actions/case";
import { InsertCase, SelectCase, SelectQuestion } from "@/lib/schema";

import { EmbeddedVideo } from "../embedded-video";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { OlympiadLevelSelector } from "./olympiad-level-selector";

export const CaseDialog = ({
  caseData,
}: {
  caseData?: (SelectCase & { questions: SelectQuestion[] }) | null;
}) => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState<InsertCase>({
    name: caseData?.name ?? "",
    bodytext: caseData?.bodytext ?? "",
    level: caseData?.level ?? "junior",
    isVideo: caseData?.isVideo ?? false,
    isPublic: caseData?.isPublic ?? false,
  });

  const [questionText, setQuestionText] = useState<string>(
    caseData?.questions?.[0]?.text ?? ""
  );

  const { execute, isPending } = useAction(UPSERT_CASE_ACTION, {
    onSuccess: () => setOpen(false),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size={caseData ? "sm" : "default"}>
            {caseData ? <PencilIcon /> : <PlusIcon />}
            {caseData ? "Edit" : "Create Case"}
          </Button>
        }
      />
      <DialogContent className="min-w-[50vw] min-h-[50vh]">
        <DialogHeader>
          <DialogTitle>{caseData ? "Edit Case" : "Create Case"}</DialogTitle>
        </DialogHeader>
        <div className="py-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 pr-4 border-r">
              <p>Level:</p>
              <OlympiadLevelSelector
                level={data?.level}
                onChange={(level) => level && setData({ ...data, level })}
                disabled={!!caseData}
              />
            </div>
            <div className="flex items-center gap-2 pr-4 border-r">
              <p>Mode:</p>
              <Tabs
                value={data?.isVideo ? "video" : "text"}
                onValueChange={(value) =>
                  setData({ ...data, isVideo: value === "video" })
                }
              >
                <TabsList>
                  <TabsTrigger value="text">Text</TabsTrigger>
                  <TabsTrigger value="video">Video</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center gap-2">
              <p>Public:</p>
              <Switch
                checked={data?.isPublic}
                onCheckedChange={(checked) =>
                  setData({ ...data, isPublic: checked })
                }
              />
            </div>
          </div>

          <div>
            <p>Case Name</p>
            <Input
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div>
            <p>Question</p>
            <Textarea
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
            />
          </div>

          {data.isVideo ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>Video URL</p>
                <Textarea
                  value={data.bodytext}
                  onChange={(e) =>
                    setData({ ...data, bodytext: e.target.value })
                  }
                />
              </div>
              <div>
                <p>Preview</p>
                <EmbeddedVideo url={data.bodytext} />
              </div>
            </div>
          ) : (
            <div>
              <p>Text</p>
              <Textarea
                className="h-96"
                value={data.bodytext}
                onChange={(e) => setData({ ...data, bodytext: e.target.value })}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              execute({
                case: { ...data, id: caseData?.id },
                question: { text: questionText },
              });
            }}
            disabled={isPending}
          >
            Save
            {isPending ? <Loader2 className="animate-spin" /> : <CheckCircle />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const DeleteCaseDialog = ({ caseData }: { caseData: SelectCase }) => {
  const [input, setInput] = useState<string>("");

  const { execute, isPending } = useAction(DELETE_CASE_ACTION);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="destructive" size="sm">
            Delete <Trash />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Case</DialogTitle>
        </DialogHeader>
        <div className="py-8 space-y-4">
          <p>
            Are you sure you want to delete this case? Enter the name of the
            case in the input below to confirm.
          </p>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={caseData.name}
          />
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => execute({ id: caseData?.id })}
            disabled={input !== caseData?.name || isPending}
          >
            Confirm
            {isPending ? <Loader2 className="animate-spin" /> : <CheckCircle />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
