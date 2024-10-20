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
import {
  CheckCircledIcon,
  CrossCircledIcon,
  PlusCircledIcon,
  ReloadIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
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

  const { execute, isPending } = useAction(UpdateEventAction);

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
        <div className="px-4 pb-2 flex items-center justify-between text-sm text-muted-foreground">
          <p className="pl-10">Team Name</p>
          <div className="flex items-center gap-4">
            {heats.map((_, i) => (
              <p key={i} className="w-14 pr-4 border-r whitespace-nowrap">
                Heat {i + 1}
              </p>
            ))}
            <p className="w-16 text-right">Total</p>
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
                className="pl-2 pr-4 py-2 border rounded-md flex items-center justify-between odd:bg-accent/25"
              >
                <div className="flex items-center gap-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={isPending || team_results.length > 0}
                    onClick={() =>
                      execute({
                        id: eventId,
                        teams: teams.filter((t) => t !== team),
                      })
                    }
                  >
                    <CrossCircledIcon className="w-4" />
                  </Button>
                  {team}
                </div>
                <TeamScores
                  heats={heats}
                  results={team_results}
                  total={team_totals[team]}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

const TeamScores = ({
  heats,
  results,
  total,
}: {
  heats: zOlympiadHeats;
  results: InferSelectModel<typeof ResultsTable>[];
  total: number;
}) => (
  <div className="flex items-center gap-4">
    {heats.map((_, i) => {
      const result = results.find((r) => r.heat === i + 1);
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
    <div className="w-16 flex items-center justify-between">
      <p>{total}</p>
      <p className="text-sm text-muted-foreground">/{heats.length * 60}</p>
      {results.some((r) => r.honorable === true) && (
        <StarFilledIcon className="w-3 text-yellow-500" />
      )}
    </div>
  </div>
);

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
            value={newTeams?.join("\n")}
            onChange={(e) => setNewTeams(e.target.value.split(/[,|\n]/))}
            className="min-h-[30vh]"
            placeholder={
              "You can add one or more teams, but they must be separeted on new lines. For Example:\n\nXYZ School Team 1\nXYZ School Team 2\nABC School\netc."
            }
          />
        </div>
        <DialogFooter>
          <Button
            disabled={!newTeams || isPending}
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
            {isPending ? (
              <ReloadIcon className="w-4 ml-4 animate-spin" />
            ) : (
              <CheckCircledIcon className="w-4 ml-4 " />
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
