"use client";

import { ChevronRight, Notebook } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Match } from "@/lib/schedule";
import { SelectScore } from "@/lib/schema";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export const JudgeMatches = ({
  eventId,
  matches,
  scores,
}: {
  eventId: number;
  matches: Match[];
  scores: SelectScore[];
}) => {
  const router = useRouter();
  return (
    <div className="space-y-4">
      {matches.map((match) => {
        const isScored = scores.some(
          (score) => score.team === match.teamA || score.team === match.teamB
        );

        return (
          <Card key={match.heat}>
            <CardHeader className="flex items-center justify-between">
              <CardDescription>Heat {match.heat}</CardDescription>
              <CardTitle>
                {match.teamA} & {match.teamB}
              </CardTitle>
              <CardAction className="flex items-center gap-4">
                <Button
                  variant="outline"
                  disabled={isScored}
                  onClick={() =>
                    router.push(
                      `/events/${eventId}?heat=${match.heat}&scores=true`
                    )
                  }
                >
                  {isScored ? "Scores Entered" : "Enter Scores"} <Notebook />
                </Button>
                <Button
                  disabled={isScored}
                  onClick={() =>
                    router.push(`/events/${eventId}?heat=${match.heat}`)
                  }
                >
                  Start Heat <ChevronRight />
                </Button>
              </CardAction>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
};
