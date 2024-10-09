import { TemplateEvents } from "@/components/template-events";
import { NewEvent } from "@/components/new-event";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { TemplateCases } from "@/components/template-cases";

export default async function TemplatePage({
  params,
  searchParams,
}: {
  params: { templateId: string };
  searchParams: { eventId?: string };
}) {
  const templateId = Number(params.templateId);
  const eventId = Number(searchParams.eventId);

  if (!templateId) return redirect("/manager/events");

  const template = await db.query.TemplatesTable.findFirst({
    where: (table, { eq }) => eq(table.id, templateId),
  });

  if (!template) return redirect("/manager/events");

  const events = await db.query.EventsTable.findMany({
    where: (table, { eq }) => eq(table.templateId, templateId),
  });

  const results = await db.query.ResultsTable.findMany({
    where: (table, { eq }) => eq(table.eventId, eventId ? eventId : 0),
  });

  const cases = await db.query.CasesTable.findMany({});

  return (
    <>
      <h1 className="px-4 text-5xl font-bold">{template?.title}</h1>
      <div className="flex gap-4">
        <TemplateCases
          cases={cases}
          heats={template.heats}
          templateId={templateId}
        />
        <div className="w-full p-4 border rounded-md flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold mb-4">Events</p>
            <NewEvent templateId={templateId} />
          </div>
          <div className="h-full flex gap-4">
            <div className="w-64 flex flex-col gap-4 shrink-0">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/manager/events/${event.templateId}?eventId=${event.id}`}
                >
                  <Button
                    className="w-full justify-start"
                    variant={eventId === event.id ? "secondary" : "outline"}
                  >
                    {event.title}
                  </Button>
                </Link>
              ))}
            </div>
            {!!eventId && (
              <TemplateEvents
                eventId={eventId}
                heats={template.heats}
                eventName={events.find((e) => e.id === eventId)?.title ?? ""}
                teams={events.find((e) => e.id === eventId)?.teams ?? []}
                results={results}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
