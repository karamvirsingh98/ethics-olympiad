"use client";

import { CheckCircle, Loader2, PlusCircle, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

import {
  DELETE_OLYMPIAD_ACTION,
  UPSERT_OLYMPIAD_ACTION,
} from "@/lib/actions/olympiads";
import { InsertOlympiad, SelectOlympiad } from "@/lib/schema";

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
import { OlympiadLevelSelector } from "./olympiad-level-selector";

export const CreateOlympiadDialog = () => {
  const [data, setData] = useState<InsertOlympiad>({
    name: "",
    heats: [],
    level: "junior",
  });

  const { execute, isExecuting } = useAction(UPSERT_OLYMPIAD_ACTION);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button>
            Create Olympiad
            <PlusCircle />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Olympiad</DialogTitle>
        </DialogHeader>
        <div className="py-8 space-y-4">
          <div>
            <p>Olympiad Name</p>
            <Input
              value={data?.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div>
            <p>Level</p>
            <OlympiadLevelSelector
              level={data?.level}
              onChange={(level) => level && setData({ ...data, level })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => execute(data)} disabled={isExecuting}>
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

export const DeleteOlympiadDialog = ({
  olympiadData,
}: {
  olympiadData: SelectOlympiad;
}) => {
  const [input, setInput] = useState<string>("");

  const { execute, isExecuting } = useAction(DELETE_OLYMPIAD_ACTION);

  return (
    <Dialog>
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
        </DialogHeader>
        <div className="py-8 space-y-4">
          <p>
            Are you sure you want to delete this olympiad? Enter the name of the
            olympiad in the input below to confirm.
          </p>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={olympiadData.name}
          />
        </div>
        <DialogFooter>
          <Button
            variant="destructive"
            onClick={() => execute({ id: olympiadData.id })}
            disabled={input !== olympiadData?.name || isExecuting}
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
