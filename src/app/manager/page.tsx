import { db } from "@/lib/db";
import { parse_jwt_payload } from "@/lib/jwt";
import { CalendarIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LocaleDateString } from "@/components/date-formatters";

export default async function ManagerPage() {
  const token = cookies().get("auth-token")?.value;
  if (!token) redirect("/");

  const { userId } = parse_jwt_payload<{ userId: number }>(token);

  // selects events where user owns template, and event is upcoming
  const templates = await db.query.TemplatesTable.findMany({
    columns: {},
    where: (table, { eq }) => eq(table.userId, userId),
    with: { events: { where: (table, { gt }) => gt(table.date, new Date()) } },
  });

  // maps selected events into a flat array of events
  const events = templates.map((t) => t.events).flat();

  return (
    <>
      <h1 className="text-5xl font-bold">Upcoming Events</h1>
      <div className="grid lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <Link
            key={event.id}
            href={`/manager/events/${event.templateId}/${event.id}`}
            className="p-4 border rounded-md hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all"
          >
            <p className="mb-4 text-lg font-semibold">{event.title}</p>
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground flex items-center">
                <CalendarIcon className="w-4 mr-2" />{" "}
                <LocaleDateString date={event.date} />
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
    </>
  );
}
