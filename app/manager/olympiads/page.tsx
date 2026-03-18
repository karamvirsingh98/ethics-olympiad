import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense, use } from "react";

import { CreateOlympiadDialog } from "@/components/manager/olympiad-dialogs";
import { RoutedOlympiadLevelSelector } from "@/components/manager/olympiad-level-selector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { OlympiadLevel } from "@/lib/enums";
import { SelectOlympiad } from "@/lib/schema";
import { getUserFromCookies } from "@/lib/user";

export default async function OlympiadsPage({
  searchParams,
}: {
  searchParams: Promise<{ level: OlympiadLevel }>;
}) {
  const { level } = await searchParams;

  const user = await getUserFromCookies();
  if (!user) return redirect("/login");

  const olympiads = db.query.olympiadsTable.findMany({
    where: (table, { eq, and }) =>
      and(
        eq(table.ownerId, user.id),
        level ? eq(table.level, level) : undefined
      ),
    with: { events: { columns: { id: true } } },
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">All Olympiads</h1>
        <div className="flex items-center gap-4">
          <RoutedOlympiadLevelSelector />
          <CreateOlympiadDialog />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        <Suspense
          key={level}
          fallback={Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-40" />
          ))}
        >
          <OlympiadsList olympiads={olympiads} />
        </Suspense>
      </div>
    </>
  );
}

const OlympiadsList = ({
  olympiads,
}: {
  olympiads: Promise<(SelectOlympiad & { events: { id: number }[] })[]>;
}) =>
  use(olympiads).map((olympiad) => (
    <Link href={`/manager/olympiads/${olympiad.id}`} key={olympiad.id}>
      <Card>
        <CardHeader>
          <CardTitle>{olympiad.name}</CardTitle>
          <CardDescription className="capitalize">
            {olympiad.level} School
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-5">
            {olympiad.heats.length} Heats
          </CardDescription>
          <CardDescription className="line-clamp-5">
            {olympiad.events.length} Events
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  ));
