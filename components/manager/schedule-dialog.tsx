import { List } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
  const schedule = computeSchedule(
    numHeats,
    teams,
    judges.map(({ judge }) => judge.id)
  );

  if (numHeats === 0 || teams.length === 0 || judges.length === 0) return null;

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button>
            View Schedule <List />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule</DialogTitle>
        </DialogHeader>
        <div className="py-8 space-y-4">
          <Tabs defaultValue="0">
            <TabsList className="mb-4">
              {Array.from({ length: numHeats }).map((_, i) => (
                <TabsTrigger key={i} value={i.toString()}>
                  Heat {i + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {Array.from({ length: numHeats }).map((_, i) => (
              <TabsContent key={i} value={i.toString()} className="space-y-2">
                {schedule
                  .filter((match) => match.heat === i + 1)
                  .map((match) => {
                    const judge = judges.find(
                      ({ judge }) => judge.id === match.judgeId
                    )?.judge.name;
                    return (
                      <div
                        key={`${match.teamA}-${match.teamB}-${match.heat}`}
                        className="flex items-center justify-between pb-2 border-b last:border-b-0"
                      >
                        <p>{judge}</p>
                        <p className="font-bold">
                          {match.teamA} vs {match.teamB}
                        </p>
                      </div>
                    );
                  })}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
