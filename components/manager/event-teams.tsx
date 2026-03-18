"use client";

import {
  CheckCircle,
  Loader2,
  MinusCircle,
  PlusCircle,
  Star,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

import { UPSERT_EVENT_ACTION } from "@/lib/actions/olympiads";
import { computeSchedule } from "@/lib/schedule";
import { SelectEvent, SelectScore } from "@/lib/schema";
import { total_score } from "@/lib/scoring";

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
import { Textarea } from "../ui/textarea";

export const EventTeams = ({
  numHeats,
  event,
}: {
  numHeats: number;
  event: SelectEvent & {
    scores: SelectScore[];
    judges: { judge: { id: number; name: string } }[];
  };
}) => {
  const { execute, isExecuting } = useAction(UPSERT_EVENT_ACTION);

  const schedule = computeSchedule(
    numHeats,
    event.teams,
    event.judges.map(({ judge }) => judge.id)
  );

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Teams</CardTitle>
        <AddTeams
          teams={event.teams}
          onChange={(teams) => execute({ ...event, teams })}
          loading={isExecuting}
        />
      </CardHeader>
      <CardContent>
        {/* header  */}
        <div className="mb-4 grid grid-cols-3 text-xs text-muted-foreground">
          <p>Team</p>
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${numHeats + 1}, 1fr)` }}
          >
            {Array.from({ length: numHeats }).map((_, i) => (
              <p key={i}> Heat {i + 1}</p>
            ))}
            <p>Total</p>
          </div>
        </div>

        {/* scores */}
        {event.teams.map((team) => (
          <div
            key={team}
            className="grid grid-cols-3 pb-2 mb-2 border-b last:border-b-0"
          >
            <p>{team}</p>
            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${numHeats + 1}, 1fr)` }}
            >
              {Array.from({ length: numHeats }).map((_, i) => {
                const match = schedule.find(
                  (s) =>
                    s.heat === i + 1 && (s.teamA === team || s.teamB === team)
                );

                const score = event.scores.find(
                  (s) => s.team === team && s.judgeId === match?.judgeId
                );

                return (
                  <p key={i} className="flex items-center gap-2">
                    {total_score(score) || "--"}
                    {score?.honorable && (
                      <Star className="size-3 text-yellow-200 fill-yellow-200" />
                    )}
                  </p>
                );
              })}
              <p className="font-bold flex items-center gap-2">
                {event.scores
                  .filter((s) => s.team === team)
                  .reduce((acc, s) => acc + total_score(s), 0) || "--"}
                {event.scores
                  .filter((s) => s.team === team)
                  .some((s) => s.honorable) && (
                  <Star className="size-3 text-yellow-200 fill-yellow-200" />
                )}
              </p>
            </div>
            <div className="justify-self-end flex items-center gap-2">
              <RemoveTeam
                team={team}
                teams={event.teams}
                onChange={(teams) => execute({ ...event, teams })}
                loading={isExecuting}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

const AddTeams = ({
  teams,
  onChange,
  loading,
}: {
  teams: string[];
  onChange: (teams: string[]) => void;
  loading: boolean;
}) => {
  const [newTeams, setNewTeams] = useState("");

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button size="xs">
            Add Teams <PlusCircle />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Teams</DialogTitle>
        </DialogHeader>
        <div className="py-8 space-y-4">
          <Textarea
            placeholder="Enter team names, one per line"
            value={newTeams}
            onChange={(e) => setNewTeams(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose
            render={
              <Button
                size="sm"
                onClick={() => {
                  onChange([...teams, ...newTeams.split("\n")]);
                  setNewTeams("");
                }}
              >
                Add Teams
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <CheckCircle />
                )}
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const RemoveTeam = ({
  team,
  teams,
  onChange,
  loading,
}: {
  team: string;
  teams: string[];
  onChange: (teams: string[]) => void;
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
            Are you sure you want to remove {team}? This will impact the
            schedule and scores. It is inadvisable to remove a team after the
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
                onClick={() => onChange(teams.filter((t) => t !== team))}
              >
                Remove Team
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
