"use client";

import { useChannel, usePresenceListener } from "ably/react";
import {
  ChevronDown,
  Circle,
  Loader2,
  MinusCircle,
  PlusCircle,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

import { JudgeState } from "@/hooks/use-event-state";
import { UPDATE_JUDGE_ACTION } from "@/lib/actions/olympiads";
import { SelectUser } from "@/lib/schema";
import { SelectJudge } from "@/lib/schema/judges";
import { OLYMPIAD_TIMER_LABELS } from "@/lib/timing";
import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const EventJudges = ({
  eventId,
  allJudges,
  assignedJudges,
}: {
  eventId: number;
  allJudges: SelectUser[];
  assignedJudges: SelectJudge[];
}) => {
  const { execute, isExecuting } = useAction(UPDATE_JUDGE_ACTION);

  const [judgeState, setJudgeState] = useState<Record<number, JudgeState>>({});

  useChannel(`event-${eventId}`, (message) => {
    setJudgeState((state) => ({
      ...state,
      [Number(message.name)]: JSON.parse(message.data),
    }));
  });

  const { presenceData } = usePresenceListener(`event-${eventId}`);
  console.log(presenceData);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Judges</CardTitle>
        <AddJudges
          allJudges={allJudges}
          assignedJudgeIds={assignedJudges.map((judge) => judge.judgeId)}
          onChange={(judgeIds) =>
            execute({ direction: "add", eventId, judgeIds })
          }
          loading={isExecuting}
        />
      </CardHeader>
      <CardContent>
        {assignedJudges.map(({ judgeId }) => {
          const judge = allJudges.find((j) => j.id === judgeId);
          if (!judge) return null;

          const state = judgeState[judgeId];
          const minutes = state ? Math.floor(state?.time / 60) : 0;
          const seconds = state ? state?.time - minutes * 60 : 0;

          const present = presenceData.some(
            (p) => p.clientId === judge.id.toString()
          );

          return (
            <div
              key={judgeId}
              className="flex items-center justify-between gap-4 pb-2 border-b mb-2"
            >
              <p className="flex-1">{judge.name}</p>

              <Circle
                className={cn(
                  "size-3 stroke-transparent",
                  present ? "fill-green-500" : "fill-accent"
                )}
              />
              <p className="font-mono">Round: {state?.round ?? "-"}</p>
              <div className="flex items-center gap-1 font-mono">
                <p>{minutes.toString().padStart(2, "0")}</p>
                <p className="pb-0.5">:</p>
                <p>{seconds.toString().padStart(2, "0")}</p>
              </div>
              <div className="flex gap-2">
                {["Reading", ...OLYMPIAD_TIMER_LABELS].map((label, i) =>
                  i === state?.stage ? (
                    <Badge key={i}>{label}</Badge>
                  ) : (
                    <Circle
                      key={i}
                      className="size-5 text-accent fill-accent"
                    />
                  )
                )}
              </div>
              <RemoveJudge
                judge={judge}
                onChange={(judgeId) =>
                  execute({ direction: "remove", eventId, judgeIds: [judgeId] })
                }
                loading={isExecuting}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

const AddJudges = ({
  allJudges,
  assignedJudgeIds,
  onChange,
  loading,
}: {
  allJudges: SelectUser[];
  assignedJudgeIds: number[];
  onChange: (judgeIds: number[]) => void;
  loading: boolean;
}) => {
  const [selected, setSelected] = useState<number[]>([]);

  const filteredJudges = allJudges.filter(
    (judge) =>
      !assignedJudgeIds.includes(judge.id) && !selected.includes(judge.id)
  );

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="xs">
            Add Judges
            {loading ? <Loader2 className="animate-spin" /> : <PlusCircle />}
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Judges</DialogTitle>
        </DialogHeader>
        <div className="py-8 space-y-2">
          <DropdownMenu modal disabled={filteredJudges.length === 0}>
            <DropdownMenuTrigger
              render={
                <Button
                  className={"w-full justify-between mb-2"}
                  variant="outline"
                >
                  Select Judge
                  <ChevronDown />
                </Button>
              }
            />
            <DropdownMenuContent>
              {filteredJudges.map((judge) => (
                <DropdownMenuItem
                  key={judge.id}
                  onClick={() => setSelected([...selected, judge.id])}
                >
                  {judge.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {selected.map((judgeId) => {
            const judge = allJudges.find((j) => j.id === judgeId);
            if (!judge) return null;
            return (
              <Button
                key={judge.id}
                variant="outline"
                className="w-full justify-between"
                onClick={() =>
                  setSelected(selected.filter((id) => id !== judgeId))
                }
              >
                {judge.name}
                <MinusCircle />
              </Button>
            );
          })}
        </div>
        <DialogFooter>
          <DialogClose
            render={
              <Button
                onClick={() => {
                  onChange(selected);
                  setSelected([]);
                }}
                disabled={loading}
              >
                Add Judges
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <PlusCircle />
                )}
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const RemoveJudge = ({
  judge,
  onChange,
  loading,
}: {
  judge: SelectUser;
  onChange: (judgeId: number) => void;
  loading: boolean;
}) => {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="icon-xs" variant="destructive" disabled={loading}>
            <MinusCircle />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Team</DialogTitle>
        </DialogHeader>
        <div className="py-8 space-y-4">
          <p>
            Are you sure you want to remove {judge.name}? This will impact the
            schedule and scores. It is inadvisable to remove a judge after the
            event has started.
          </p>
        </div>
        <DialogFooter>
          <DialogClose
            render={
              <Button size="sm" variant="secondary">
                Cancel
              </Button>
            }
          />
          <DialogClose
            render={
              <Button
                size="sm"
                variant="destructive"
                disabled={loading}
                onClick={() => onChange(judge.id)}
              >
                Remove Judge
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <MinusCircle />
                )}
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
