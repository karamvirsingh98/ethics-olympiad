"use client";

import { CheckCircle, Loader2, PencilIcon, PlusIcon, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import z from "zod";

import { DELETE_CASE_ACTION, UPSERT_CASE_ACTION } from "@/lib/actions/case";
import { olympiadLevels } from "@/lib/enums";
import { SelectCase, SelectQuestion } from "@/lib/schema";

import { EmbeddedVideo } from "../embedded-video";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormDialog } from "../ui/form-dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import { OlympiadLevelSelector } from "./olympiad-level-selector";

const caseSchema = z.object({
  name: z.string().min(1, "Case name is required"),
  bodytext: z.string().min(1, "Case body is required"),
  level: z.enum(olympiadLevels),
  isVideo: z.boolean(),
  isPublic: z.boolean(),
  questionText: z.string().min(1, "Question is required"),
});

type CaseFormValues = z.infer<typeof caseSchema>;

export const CaseDialog = ({
  caseData,
}: {
  caseData?: (SelectCase & { questions: SelectQuestion[] }) | null;
}) => {
  const defaultValues: CaseFormValues = {
    name: caseData?.name ?? "",
    bodytext: caseData?.bodytext ?? "",
    level: caseData?.level ?? "junior",
    isVideo: caseData?.isVideo ?? false,
    isPublic: caseData?.isPublic ?? false,
    questionText: caseData?.questions?.[0]?.text ?? "",
  };

  return (
    <FormDialog
      schema={caseSchema}
      defaultValues={defaultValues}
      action={UPSERT_CASE_ACTION}
      title={caseData ? "Edit Case" : "Create Case"}
      description={
        caseData
          ? "Update this case's details, level, and prompt."
          : "Create a new case with a question and supporting text or video."
      }
      submitLabel="Save"
      contentClassName="min-w-[50vw] min-h-[50vh] sm:max-w-2xl"
      toInput={(values) => ({
        case: {
          id: caseData?.id,
          name: values.name,
          bodytext: values.bodytext,
          level: values.level,
          isVideo: values.isVideo,
          isPublic: values.isPublic,
        },
        question: { text: values.questionText },
      })}
      trigger={
        <Button size={caseData ? "sm" : "default"}>
          {caseData ? <PencilIcon /> : <PlusIcon />}
          {caseData ? "Edit" : "Create Case"}
        </Button>
      }
    >
      {(form) => {
        const isVideo = form.watch("isVideo");
        const bodytext = form.watch("bodytext");
        return (
          <>
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 pr-4 border-r">
                    <FormLabel>Level:</FormLabel>
                    <FormControl>
                      <OlympiadLevelSelector
                        level={field.value}
                        onChange={(level) => level && field.onChange(level)}
                        disabled={!!caseData}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isVideo"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2 pr-4 border-r">
                    <FormLabel>Mode:</FormLabel>
                    <FormControl>
                      <Tabs
                        value={field.value ? "video" : "text"}
                        onValueChange={(value) =>
                          field.onChange(value === "video")
                        }
                      >
                        <TabsList>
                          <TabsTrigger value="text">Text</TabsTrigger>
                          <TabsTrigger value="video">Video</TabsTrigger>
                        </TabsList>
                      </Tabs>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isPublic"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormLabel>Public:</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Case Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="questionText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isVideo ? (
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="bodytext"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video URL</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-2">
                  <Label>Preview</Label>
                  <EmbeddedVideo url={bodytext} />
                </div>
              </div>
            ) : (
              <FormField
                control={form.control}
                name="bodytext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Textarea className="h-96" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </>
        );
      }}
    </FormDialog>
  );
};

export const DeleteCaseDialog = ({ caseData }: { caseData: SelectCase }) => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");

  const { execute, isExecuting } = useAction(DELETE_CASE_ACTION, {
    onSuccess: () => setOpen(false),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogDescription>
            Deleting a case removes its questions and unlinks it from any
            heats. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p>
            Are you sure you want to delete this case? Enter the name of the
            case in the input below to confirm.
          </p>
          <div className="grid gap-2">
            <Label htmlFor="delete-case-confirm">
              Type the name to confirm:{" "}
              <span className="font-mono">{caseData.name}</span>
            </Label>
            <Input
              id="delete-case-confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => execute({ id: caseData.id })}
            disabled={confirm !== caseData.name || isExecuting}
          >
            Confirm
            {isExecuting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <CheckCircle />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
