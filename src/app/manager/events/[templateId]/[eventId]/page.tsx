import { BackButton } from "@/components/back-button";
import { EventJudges } from "@/components/events/event-judges";
import { EventTeams } from "@/components/events/event-teams";
import { EventTimers } from "@/components/events/event-timers";
import { db } from "@/lib/db";
import { CalendarIcon, LockClosedIcon } from "@radix-ui/react-icons";

export default async function EventPage({
  params,
}: {
  params: { eventId: string; templateId: string };
}) {
  const eventId = Number(params.eventId);

  const event = await db.query.EventsTable.findFirst({
    where: (table, { eq }) => eq(table.id, eventId),
    with: { template: true, results: true },
  });

  if (!event) return null;

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-5xl font-bold">{event.title}</h1>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="px-4 py-1 border rounded-md flex items-center">
            <CalendarIcon className="mr-4" />
            {event.date.toLocaleDateString()}
          </div>
          <div className="px-4 py-1 border rounded-md flex items-center">
            <LockClosedIcon className="mr-4" />
            {event.password}
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <EventTeams
          eventId={eventId}
          teams={event.teams}
          results={event.results}
          heats={event.template.heats}
        />
        <div className="w-full flex flex-col-reverse lg:flex-col gap-4">
          <EventTimers eventId={eventId} timers={event.timers} />
          <EventJudges eventId={eventId} />
        </div>
      </div>
    </>
  );
}
