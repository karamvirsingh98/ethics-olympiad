"use client";

import { UpdateEventAction } from "@/lib/actions";
import { useAction } from "next-safe-action/hooks";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PlusCircledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Textarea } from "../ui/textarea";
import { useEffect, useMemo, useState } from "react";
import { zOlympiadHeats, zOlympiadScore } from "@/lib/entities";
import { InferSelectModel } from "drizzle-orm";
import { ResultsTable } from "@/lib/schema";
import { usePusher } from "@/lib/pusher";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { PUSHER_FORMATS } from "@/lib/utils";

export const EventTeams = ({
  eventId,
  teams,
  heats,
  results,
}: {
  eventId: number;
  teams: string[];
  heats: zOlympiadHeats;
  results: InferSelectModel<typeof ResultsTable>[];
}) => {
  const [sorting, setSorting] = useState("a-z");

  const router = useRouter();

  const listener = usePusher(eventId);
  useEffect(() => {
    const handler = () => router.refresh();
    listener.bind(PUSHER_FORMATS.SCORE_SUBMISSION(eventId), handler);
    return () => {
      listener.unbind(PUSHER_FORMATS.SCORE_SUBMISSION(eventId), handler);
    };
  });

  const team_totals = useMemo(
    () =>
      results.reduce((map, r) => {
        const total = map[r.team] ?? 0;
        return { ...map, [r.team]: total + total_score(r.score) };
      }, {} as Record<string, number>),
    [results]
  );

  return (
    <div className="w-full flex flex-col gap-4 p-4 border rounded-md h-fit">
      <div className="mb-4 flex justify-between">
        <p className="text-xl font-bold">Teams</p>
        <div className="flex gap-2">
          <Select value={sorting} onValueChange={setSorting}>
            <SelectTrigger className="h-8 w-40 text-xs font-medium">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="a-z">Names A-Z</SelectItem>
              <SelectItem value="z-a">Names Z-A</SelectItem>
              <SelectItem value="h-l">Scores High to Low</SelectItem>
              <SelectItem value="l-h">Scores Low to High</SelectItem>
            </SelectContent>
          </Select>
          <AddTeams eventId={eventId} teams={teams} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="px-4 border border-transparent text-xs text-muted-foreground flex items-center justify-between">
          Team Name
          <div className="flex items-center gap-4">
            {heats.map((_, i) => (
              <p key={i} className="w-14 pr-4 border-r">
                Heat {i + 1}
              </p>
            ))}
            <p className="w-16">Total</p>
          </div>
        </div>
        {teams
          .sort((a, b) => {
            if (sorting === "a-z") return a > b ? 1 : -1;
            if (sorting === "z-a") return b > a ? 1 : -1;
            if (sorting === "h-l") return team_totals[b] - team_totals[a];
            if (sorting === "l-h") return team_totals[a] - team_totals[b];
            return 1;
          })
          .map((team) => {
            const team_results = results.filter((r) => r.team === team);
            return (
              <div
                key={team}
                className="px-4 py-2 border rounded-md flex items-center justify-between odd:bg-accent/25"
              >
                {team}
                <div className="flex items-center gap-4">
                  {heats.map((_, i) => {
                    const result = team_results.find((r) => r.heat === i + 1);
                    return (
                      <p
                        key={i}
                        className="w-14 pr-4 border-r flex items-center justify-between"
                      >
                        {total_score(result?.score)}
                        {result?.honorable && (
                          <StarFilledIcon className="w-3 text-yellow-500" />
                        )}
                      </p>
                    );
                  })}

                  {/* total score */}
                  <div className="w-16 flex items-center justify-between">
                    <p>
                      {team_totals[team]}
                      <span className="text-muted-foreground text-sm">
                        /{heats.length * 60}
                      </span>
                    </p>
                    {team_results.some((r) => r.honorable === true) && (
                      <StarFilledIcon className="w-3 text-yellow-500" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const total_score = (score: zOlympiadScore | undefined) => {
  if (!score) return 0;
  return Object.values(score).reduce((sum, num) => (sum += num), 0);
};

const AddTeams = ({ eventId, teams }: { eventId: number; teams: string[] }) => {
  const [open, setOpen] = useState(false);
  const [newTeams, setNewTeams] = useState<string[]>();
  const { execute, isPending } = useAction(UpdateEventAction, {
    onSuccess: () => {
      setOpen(false);
      setNewTeams(undefined);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={isPending}>
        <Button size="sm" variant="outline">
          Add Teams <PlusCircledIcon className="w-4 ml-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Teams</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            value={newTeams}
            onChange={(e) => setNewTeams(e.target.value.split(","))}
          />
        </div>
        <DialogFooter>
          <Button
            disabled={!newTeams}
            onClick={() =>
              newTeams &&
              execute({
                id: eventId,
                teams: [
                  ...teams,
                  ...newTeams.filter((t) => !!t).map((t) => t.trim()),
                ],
              })
            }
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
