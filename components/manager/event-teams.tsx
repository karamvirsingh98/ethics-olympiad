"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle,
  Loader2,
  MinusCircle,
  PlusCircle,
  Star,
} from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
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

const addTeamsSchema = z.object({
  teams: z.string().min(1, "Enter at least one team name"),
});

type AddTeamsValues = z.infer<typeof addTeamsSchema>;

const AddTeams = ({
  teams,
  onChange,
  loading,
}: {
  teams: string[];
  onChange: (teams: string[]) => void;
  loading: boolean;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<AddTeamsValues>({
    resolver: zodResolver(addTeamsSchema),
    defaultValues: { teams: "" },
  });

  useEffect(() => {
    if (open) form.reset({ teams: "" });
  }, [open, form]);

  const onSubmit = form.handleSubmit(({ teams: raw }) => {
    const existing = new Set(teams);
    const newTeams = raw
      .split("\n")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .filter((t, i, arr) => arr.indexOf(t) === i)
      .filter((t) => !existing.has(t));

    if (newTeams.length === 0) {
      form.setError("teams", {
        message: "All entries are empty or already exist on this event.",
      });
      return;
    }

    onChange([...teams, ...newTeams]);
    setOpen(false);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <DialogDescription>
            Enter one team name per line. Duplicates of existing teams are
            ignored.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="teams"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team names</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter team names, one per line"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-2">
              <Button size="sm" type="submit" disabled={loading}>
                Add Teams
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <CheckCircle />
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
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
          <DialogDescription>
            Removing a team will affect the schedule and existing scores.
          </DialogDescription>
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
