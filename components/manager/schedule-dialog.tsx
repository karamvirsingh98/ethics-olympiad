import { AlertTriangle, List } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { computeSchedule } from "@/lib/schedule";

export const ScheduleDialog = ({
  numHeats,
  teams,
  judges,
}: {
  numHeats: number;
  teams: string[];
  judges: { judge: { id: number; name: string } }[];
}) => {
  if (numHeats === 0 || teams.length === 0 || judges.length === 0) return null;

  const { schedule, unscheduled } = computeSchedule(
    numHeats,
    teams,
    judges.map(({ judge }) => judge.id)
  );

  const hasIssues = unscheduled.length > 0;
  const unscheduledByHeat = new Map(
    unscheduled.map(({ heat, teams }) => [heat, teams])
  );

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant={hasIssues ? "destructive" : "default"}>
            View Schedule {hasIssues ? <AlertTriangle /> : <List />}
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule</DialogTitle>
          <DialogDescription>
            Heat-by-heat assignment of teams to judges.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {hasIssues && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm space-y-1">
              <p className="font-semibold text-destructive flex items-center gap-2">
                <AlertTriangle className="size-4" /> Not enough judges
              </p>
              <p className="text-muted-foreground">
                With {judges.length} judge{judges.length === 1 ? "" : "s"} and{" "}
                {teams.length} teams, some teams can&apos;t be paired in every
                heat. Add more judges (each judge covers 2 teams) or remove
                teams to cover everyone.
              </p>
            </div>
          )}
          <Tabs defaultValue="0">
            <TabsList className="mb-4">
              {Array.from({ length: numHeats }).map((_, i) => {
                const heatHasIssue = unscheduledByHeat.has(i + 1);
                return (
                  <TabsTrigger key={i} value={i.toString()}>
                    Heat {i + 1}
                    {heatHasIssue && (
                      <AlertTriangle className="size-3 text-destructive" />
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
            {Array.from({ length: numHeats }).map((_, i) => {
              const leftOut = unscheduledByHeat.get(i + 1) ?? [];
              return (
                <TabsContent key={i} value={i.toString()} className="space-y-2">
                  {schedule
                    .filter((match) => match.heat === i + 1)
                    .map((match) => {
                      const judge = judges.find(
                        ({ judge }) => judge.id === match.judgeId
                      )?.judge.name;
                      const incomplete =
                        match.teamA === undefined || match.teamB === undefined;
                      return (
                        <div
                          key={`${match.teamA}-${match.teamB}-${match.heat}`}
                          className="flex items-center justify-between pb-2 border-b last:border-b-0"
                        >
                          <p>{judge}</p>
                          <p
                            className={
                              incomplete
                                ? "font-bold text-destructive"
                                : "font-bold"
                            }
                          >
                            {match.teamA ?? "—"} vs {match.teamB ?? "—"}
                          </p>
                        </div>
                      );
                    })}
                  {leftOut.length > 0 && (
                    <div className="pt-4 mt-2 border-t">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
                        Left out of this heat
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {leftOut.map((team) => (
                          <Badge key={team} variant="destructive">
                            {team}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
