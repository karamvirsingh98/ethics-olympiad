import { Gavel } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {judges.length === 0 ? (
        <EmptyState
          icon={Gavel}
          title="No events assigned"
          description="When a manager assigns you to an event, it will appear here."
        />
      ) : (
        judges.map((judge) => (
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
        ))
      )}
    </div>
  );
}
