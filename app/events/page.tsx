import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { getUserFromCookies } from "@/lib/user";

export default async function EventsPage() {
  const user = await getUserFromCookies();
  if (!user) return redirect("/login");

  const judges = await db.query.judgesTable.findMany({
    with: {
      event: {
        columns: { name: true, teams: true },
        with: { olympiad: { columns: { name: true, heats: true } } },
      },
    },
    where: (table, { eq }) => eq(table.judgeId, user.id),
  });

  return (
    <div className="grid grid-cols-3 gap-6">
      {judges.map((judge) => (
        <Link
          href={`/events/${judge.eventId}`}
          key={`${judge.eventId}-${judge.judgeId}`}
        >
          <Card>
            <CardHeader>
              <CardTitle>{judge.event.name}</CardTitle>
              <CardDescription>{judge.event.olympiad.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{judge.event.teams.length} Teams</p>
              <p>{judge.event.olympiad.heats.length} Heats</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
