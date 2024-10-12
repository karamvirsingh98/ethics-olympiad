import { db } from "@/lib/db";
import { NewEvent } from "@/components/new-event";
import { TemplateCases } from "@/components/template-cases";
import { redirect } from "next/navigation";
import Link from "next/link";
import { BackButton } from "@/components/back-button";
import { CalendarIcon, LockClosedIcon } from "@radix-ui/react-icons";

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

  const cases = await db.query.CasesTable.findMany({
    where: (table, { eq }) => eq(table.level, template.level),
  });

  return (
    <>
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-5xl font-bold">{template?.title}</h1>
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-4">
        <TemplateCases
          cases={cases}
          heats={template.heats}
          templateId={templateId}
        />
        <div className="w-full p-4 border rounded-md flex flex-col gap-8 h-fit">
          <div className="flex justify-between">
            <p className="text-3xl font-bold mb-4">Events</p>
            <NewEvent templateId={templateId} />
          </div>
          <div className="grid gap-4">
            {events.map((event) => (
              <Link
                key={eventId}
                href={`/manager/events/${templateId}/${event.id}`}
                className="p-4 border rounded-md hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all"
              >
                <p className="mb-4 text-lg font-semibold">{event.title}</p>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-muted-foreground flex items-center">
                    <CalendarIcon className="w-4 mr-2" />{" "}
                    {event.date.toLocaleDateString()}
                  </p>
                  <p className="pl-4 border-l text-sm text-muted-foreground flex items-center">
                    <LockClosedIcon className="w-4 mr-2" /> {event.password}
                  </p>
                  <p className="pl-4 border-l text-sm text-muted-foreground">
                    {event.teams.length} Teams
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
