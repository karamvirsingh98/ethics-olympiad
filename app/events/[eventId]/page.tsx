import { Home } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AblyChannelProvider } from "@/components/ably-providers";
import { ActiveMatch } from "@/components/event/active-match";
import { JudgeMatches } from "@/components/event/judge-matches";
import { Scores } from "@/components/event/scores";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { computeSchedule } from "@/lib/schedule";
import { getUserFromCookies } from "@/lib/user";

export default async function EventPage({
  params,
  searchParams,
}: {
  params: Promise<{ eventId: string }>;
  searchParams: Promise<{ heat?: string; scores?: string }>;
}) {
  const { eventId } = await params;
  const { heat, scores } = await searchParams;

  const user = await getUserFromCookies();
  if (!user) return redirect("/login");

  const event = await db.query.eventsTable.findFirst({
    where: (table, { eq }) => eq(table.id, Number(eventId)),
    with: {
      olympiad: { columns: { name: true, heats: true, ownerId: true } },
      judges: { with: { judge: { columns: { name: true } } } },
      scores: { where: (table, { eq }) => eq(table.judgeId, user.id) },
    },
  });

  if (!event) return redirect("/events");

  const caseIds = event.olympiad.heats
    .map((heat) => [heat.case1, heat.case2])
    .flat()
    .filter((id) => id !== null);

  const cases = await db.query.casesTable.findMany({
    where: (table, { inArray }) => inArray(table.id, caseIds),
    with: {
      questions: {
        where: (table, { eq }) => eq(table.ownerId, event.olympiad.ownerId),
      },
    },
  });

  const schedule = computeSchedule(
    event.olympiad.heats.length,
    event.teams,
    event.judges.map(({ judgeId }) => judgeId)
  );

  const judgeMatches = schedule.filter((match) => match.judgeId === user.id);

  return (
    <AblyChannelProvider channelName={`event-${event.id}`}>
      <div className="flex flex-col min-h-0 h-full gap-6">
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl font-bold">{event?.name}</h1>
            <h2 className="text-lg text-muted-foreground">
              {event?.olympiad.name}
            </h2>
          </div>
          <Link href={`/events/${event.id}`}>
            <Button size="icon" variant="outline">
              <Home />
            </Button>
          </Link>
        </div>

        {!heat && !scores && (
          <JudgeMatches
            eventId={event.id}
            scores={event.scores}
            matches={judgeMatches}
          />
        )}

        {!!heat && !scores && (
          <ActiveMatch
            judgeId={user.id}
            eventId={event.id}
            match={judgeMatches.find((match) => match.heat === parseInt(heat))!}
            heats={event.olympiad.heats}
            cases={cases}
          />
        )}

        {!!heat && !!scores && (
          <Scores
            eventId={event.id}
            match={judgeMatches.find((match) => match.heat === parseInt(heat))!}
            allTeams={event.teams}
          />
        )}
      </div>
    </AblyChannelProvider>
  );
}
