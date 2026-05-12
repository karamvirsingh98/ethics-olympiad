"use client";

import { CheckCircle, Loader2, PlusCircle, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import z from "zod";

import {
  DELETE_OLYMPIAD_ACTION,
  UPSERT_OLYMPIAD_ACTION,
} from "@/lib/actions/olympiads";
import { olympiadLevels } from "@/lib/enums";
import { SelectOlympiad } from "@/lib/schema";

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
import { OlympiadLevelSelector } from "./olympiad-level-selector";

const olympiadSchema = z.object({
  name: z.string().min(1, "Olympiad name is required"),
  level: z.enum(olympiadLevels),
});

export const CreateOlympiadDialog = () => {
  return (
    <FormDialog
      schema={olympiadSchema}
      defaultValues={{ name: "", level: "junior" }}
      action={UPSERT_OLYMPIAD_ACTION}
      title="Create Olympiad"
      description="Start a new olympiad. You can add heats and events afterwards."
      submitLabel="Submit"
      toInput={(values) => ({ ...values, heats: [] })}
      trigger={
        <Button>
          Create Olympiad
          <PlusCircle />
        </Button>
      }
    >
      {(form) => (
        <>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Olympiad Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Level</FormLabel>
                <FormControl>
                  <OlympiadLevelSelector
                    level={field.value}
                    onChange={(level) => level && field.onChange(level)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </FormDialog>
  );
};

// The delete dialog uses a single "type the name to confirm" input that lives
// outside RHF (no schema-level constraint that compares against the live name).
// We keep it as a small controlled state with a proper visible <Label>.
export const DeleteOlympiadDialog = ({
  olympiadData,
}: {
  olympiadData: SelectOlympiad;
}) => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState("");

  const { execute, isExecuting } = useAction(DELETE_OLYMPIAD_ACTION, {
    onSuccess: () => setOpen(false),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="destructive">
            Delete <Trash />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Olympiad</DialogTitle>
          <DialogDescription>
            Deleting an olympiad removes its events, judges, and scores. This
            action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <p>
            Are you sure you want to delete this olympiad? Enter the name of
            the olympiad in the input below to confirm.
          </p>
          <div className="grid gap-2">
            <Label htmlFor="delete-olympiad-confirm">
              Type the name to confirm:{" "}
              <span className="font-mono">{olympiadData.name}</span>
            </Label>
            <Input
              id="delete-olympiad-confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => execute({ id: olympiadData.id })}
            disabled={confirm !== olympiadData.name || isExecuting}
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
