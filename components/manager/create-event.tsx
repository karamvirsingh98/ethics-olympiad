"use client";

import { CheckCircle, Loader2, PlusCircle } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

import { UPSERT_EVENT_ACTION } from "@/lib/actions/olympiads";

import { Button } from "../ui/button";
import { DatePicker } from "../ui/datepicker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export const CreateEvent = ({ olympiadId }: { olympiadId: number }) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [happensAt, setHappensAt] = useState<Date>();

  const { execute, isExecuting } = useAction(UPSERT_EVENT_ACTION, {
    onSuccess: () => setOpen(false),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button size="xs" disabled={isExecuting} onClick={() => {}}>
            Add Event
            {isExecuting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <PlusCircle />
            )}
          </Button>
        }
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
        </DialogHeader>
        <div className="py-8 space-y-4">
          <div>
            <p>Event Name</p>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <p>Event Date</p>
            <DatePicker date={happensAt} setDate={setHappensAt} />
          </div>
        </div>
        <DialogFooter>
          <Button
            disabled={!happensAt}
            onClick={() =>
              happensAt && execute({ name, olympiadId, teams: [], happensAt })
            }
          >
            Submit
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
