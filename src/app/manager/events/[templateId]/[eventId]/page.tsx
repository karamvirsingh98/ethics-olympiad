import { BackButton } from "@/components/back-button";
import { EventJudges } from "@/components/event-judges";
import { EventTeams } from "@/components/event-teams";
import { EventTimers } from "@/components/event-timers";
import { db } from "@/lib/db";
import { CalendarIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";

export default async function EventPage({
  params,
}: {
  params: { eventId: string; templateId: string };
}) {
  const eventId = Number(params.eventId);
  const templateId = Number(params.templateId);

  if (!eventId) redirect("/manager/events/" + params.templateId);

  const event = await db.query.EventsTable.findFirst({
    where: (table, { eq }) => eq(table.id, eventId),
  });

  if (!event) redirect("/manager/events/" + params.templateId);

  const template = await db.query.TemplatesTable.findFirst({
    where: (table, { eq }) => eq(table.id, templateId),
  });

  if (!template) redirect("/manager/events");

  const results = await db.query.ResultsTable.findMany({
    where: (table, { eq }) => eq(table.eventId, eventId),
  });

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-5xl font-bold">{event.title}</h1>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="px-4 py-1 border rounded-md flex items-center">
            <CalendarIcon className="w-4 mr-2" />
            {event.date.toLocaleDateString()}
          </div>
          <div className="px-4 py-1 border rounded-md flex items-center">
            <LockClosedIcon className="w-4 mr-2" />
            {event.password}
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <EventTeams
          eventId={eventId}
          teams={event.teams}
          heats={template.heats}
          results={results ?? []}
        />
        <div className="w-full flex flex-col gap-4">
          <EventTimers eventId={eventId} timers={event.timers} />
          <EventJudges eventId={eventId} />
        </div>
      </div>
    </>
  );
}
