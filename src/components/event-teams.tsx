"use client";

import { UpdateEventAction } from "@/lib/actions";
import { useAction } from "next-safe-action/hooks";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { PlusCircledIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { zOlympiadHeats, zOlympiadScore } from "@/lib/entities";
import { InferSelectModel } from "drizzle-orm";
import { ResultsTable } from "@/lib/schema";
import { usePusherListener } from "@/lib/hooks";
import { useRouter } from "next/navigation";

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
  const [open, setOpen] = useState(false);

  const [newTeams, setNewTeams] = useState<string[]>();
  const { execute, isPending } = useAction(UpdateEventAction, {
    onSuccess: () => {
      setOpen(false);
      setNewTeams(undefined);
    },
  });

  const router = useRouter();
  const listener = usePusherListener();
  useEffect(() => {
    const handler = () => router.refresh();
    listener.bind(`event-${eventId}-score-submission`, handler);
    return () => {
      listener.unbind(`event-${eventId}-score-submission`, handler);
    };
  });

  return (
    <div className="w-full flex flex-col gap-4 p-4 border rounded-md">
      <div className="mb-4 flex justify-between">
        <p className="text-xl font-bold">Teams</p>
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
      </div>
      <div className="flex flex-col gap-2">
        <div className="px-4 border border-transparent text-xs text-muted-foreground flex items-center justify-between">
          Team Name
          <div className="flex items-center gap-4">
            {heats.map((_, i) => (
              <p key={i} className="w-16 pr-4 border-r">
                Heat {i + 1}
              </p>
            ))}
            <p className="w-20">Total</p>
          </div>
        </div>
        {teams.map((team) => {
          const team_results = results.filter((r) => r.team === team);
          return (
            <div
              key={team}
              className="px-4 py-2 border rounded-md flex items-center justify-between"
            >
              {team}
              <div className="flex items-center gap-4">
                {heats.map((_, i) => {
                  const result = team_results.find((r) => r.heat === i + 1);
                  return (
                    <p key={i} className="w-16 pr-4 border-r flex items-center">
                      {total_score(result?.score)}
                      {result?.honorable && (
                        <StarFilledIcon className="w-4 ml-2 text-yellow-500" />
                      )}
                    </p>
                  );
                })}

                {/* total score */}
                <div className="w-20 flex items-center justify-between">
                  <p>
                    {team_results
                      .map(({ score }) => total_score(score))
                      .reduce((sum, num) => (sum += num), 0)}
                    <span className="text-muted-foreground text-sm">
                      /{heats.length * 60}
                    </span>
                  </p>
                  {team_results.some((r) => r.honorable === true) && (
                    <StarFilledIcon className="w-4 text-yellow-500" />
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
