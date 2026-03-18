import { ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { AblyChannelProvider } from "@/components/ably-providers";
import { EventJudges } from "@/components/manager/event-judges";
import { EventTeams } from "@/components/manager/event-teams";
import { ScheduleDialog } from "@/components/manager/schedule-dialog";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { getUserFromCookies } from "@/lib/user";

export default async function LivePage({
  params,
}: {
  params: Promise<{ olympiadId: string; eventId: string }>;
}) {
  const { olympiadId, eventId } = await params;

  const user = await getUserFromCookies();
  if (!user) return redirect("/login");

  const event = await db.query.eventsTable.findFirst({
    where: (table, { eq }) => eq(table.id, parseInt(eventId)),
    with: {
      olympiad: { columns: { heats: true, name: true } },
      judges: { with: { judge: { columns: { id: true, name: true } } } },
      scores: true,
    },
  });

  if (!event) return redirect(`/manager/olympiads/${olympiadId}`);

  const allJudges = await db.query.usersTable.findMany({
    where: (table, { eq }) => eq(table.role, "judge"),
  });

  return (
    <AblyChannelProvider channelName={`event-${event.id}`}>
      <div className="flex items-center gap-4">
        <Link href={`/manager/olympiads/${olympiadId}`}>
          <Button size="icon" variant="outline">
            <ArrowLeft />
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{event.name}</h1>
          <h2 className="text-lg text-muted-foreground">
            {event.olympiad.name}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" disabled>
            <Calendar />
            Event Date: {new Date(event.happensAt).toLocaleDateString()}
          </Button>
          <ScheduleDialog
            numHeats={event.olympiad.heats.length}
            teams={event.teams}
            judges={event.judges}
          />
        </div>
      </div>
      <div className="grid xl:grid-cols-2 gap-6 mt-12">
        <EventTeams numHeats={event.olympiad.heats.length} event={event} />
        <EventJudges
          eventId={event.id}
          allJudges={allJudges}
          assignedJudges={event.judges}
        />
      </div>
    </AblyChannelProvider>
  );
}
