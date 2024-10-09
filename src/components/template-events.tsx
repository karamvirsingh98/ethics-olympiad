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
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { zOlympiadHeats, zOlympiadScore } from "@/lib/entities";
import { InferSelectModel } from "drizzle-orm";
import { ResultsTable } from "@/lib/schema";

export const TemplateEvents = ({
  eventId,
  eventName,
  teams,
  heats,
  results,
}: {
  eventId: number;
  eventName: string;
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

  return (
    <div className="w-full flex flex-col gap-4 p-4 border rounded-md">
      <div className="flex justify-between">
        <p className="text-xl font-semibold">{eventName}</p>
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
      <div className="mt-4 flex flex-col gap-2">
        <div className="pl-2 pr-4 text-xs text-muted-foreground flex items-center justify-between">
          Team Name
          <div className="flex items-center gap-4">
            {heats.map((_, i) => (
              <p key={i} className="w-16 pr-4 border-r">
                Heat {i + 1}
              </p>
            ))}
            <p className="w-16">Total</p>
          </div>
        </div>
        {teams.map((team) => (
          <div
            key={team}
            className="p-4 border rounded-md flex items-center justify-between"
          >
            {team}
            <div className="flex items-center gap-4">
              {heats.map((_, i) => (
                <p key={i} className="w-16 pr-4 border-r">
                  {total_score(
                    results.find((r) => r.team === team && r.heat === i + 1)
                      ?.score
                  )}
                  <span className="text-muted-foreground text-sm">/60</span>
                </p>
              ))}

              {/* total score */}
              <p className="w-16">
                {results
                  .filter((r) => r.team === team)
                  .map(({ score }) => total_score(score))
                  .reduce((sum, num) => (sum += num), 0)}
                <span className="text-muted-foreground text-sm">
                  /{heats.length * 60}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const total_score = (score: zOlympiadScore | undefined) => {
  if (!score) return 0;
  return Object.values(score).reduce((sum, num) => (sum += num), 0);
};
