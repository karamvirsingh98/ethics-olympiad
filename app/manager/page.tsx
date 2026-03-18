import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense, use } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { SelectEvent, SelectOlympiad } from "@/lib/schema";
import { getUserFromCookies } from "@/lib/user";

export default async function ManagerHomePage() {
  const user = await getUserFromCookies();
  if (!user) return redirect("/login");

  const events = db.query.olympiadsTable.findMany({
    where: (table, { eq }) => eq(table.ownerId, user.id),
    with: {
      events: { where: (table, { gte }) => gte(table.happensAt, new Date()) },
    },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Upcoming Events</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <Suspense
          fallback={Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-96" />
          ))}
        >
          <EventsList events={events} />
        </Suspense>
      </div>
    </>
  );
}

const EventsList = ({
  events,
}: {
  events: Promise<(SelectOlympiad & { events: SelectEvent[] })[]>;
}) => {
  const mapped = use(events).flatMap((olympiad) =>
    olympiad.events.map((ev) => ({ ...ev, olympiadName: olympiad.name }))
  );

  return mapped.map((event) => (
    <Card key={event.id}>
      <CardHeader>
        <CardTitle className="line-clamp-1">{event.name}</CardTitle>
        <CardDescription className="line-clamp-5">
          {event.olympiadName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <CardDescription>
          Event Date: {new Date(event.happensAt).toLocaleDateString()}
        </CardDescription>
        <CardDescription>{event.teams.length} Teams</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={`/manager/olympiads/${event.olympiadId}/${event.id}`}>
          <Button>
            Go to event page
            <ChevronRight />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  ));
};
