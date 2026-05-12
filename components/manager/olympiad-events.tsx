import { AlertTriangle, ChevronRight } from "lucide-react";
import Link from "next/link";

import { computeSchedule } from "@/lib/schedule";
import { SelectEvent } from "@/lib/schema";

import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CreateEvent } from "./create-event";

export const OlympiadEvents = ({
  events,
  olympiadId,
  heatCount,
}: {
  events: (SelectEvent & { judges: { judgeId: number }[] })[];
  olympiadId: number;
  heatCount: number;
}) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Events in this Olympiad</CardTitle>
        <CreateEvent olympiadId={olympiadId} />
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => {
          const { unscheduled } = computeSchedule(
            heatCount,
            event.teams,
            event.judges.map((j) => j.judgeId)
          );
          const hasIssue = unscheduled.length > 0;

          return (
            <Link
              key={event.id}
              href={`/manager/olympiads/${olympiadId}/${event.id}`}
              className="p-4 border rounded-xl flex items-center justify-between gap-4 hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="truncate">{event.name}</span>
                {hasIssue && (
                  <Badge variant="destructive" className="gap-1 shrink-0">
                    <AlertTriangle className="size-3" />
                    Needs more judges
                  </Badge>
                )}
              </div>
              <ChevronRight className="size-4 shrink-0" />
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
};
