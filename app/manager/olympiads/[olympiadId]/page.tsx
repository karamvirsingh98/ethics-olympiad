import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { DeleteOlympiadDialog } from "@/components/manager/olympiad-dialogs";
import { OlympiadEvents } from "@/components/manager/olympiad-events";
import { OlympiadHeats } from "@/components/manager/olympiad-heats";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export default async function OlympiadPage({
  params,
}: {
  params: Promise<{ olympiadId: string }>;
}) {
  const { olympiadId } = await params;

  const olympiad = await db.query.olympiadsTable.findFirst({
    where: (table, { eq }) => eq(table.id, parseInt(olympiadId)),
    with: { events: true },
  });

  if (!olympiad) return redirect("/manager/olympiads");

  const cases = await db.query.casesTable.findMany({
    where: (table, { eq }) => eq(table.level, olympiad.level),
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/manager/olympiads">
            <Button size="icon" variant="outline">
              <ArrowLeft />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">{olympiad?.name}</h1>
        </div>
        <DeleteOlympiadDialog olympiadData={olympiad} />
      </div>
      <div className="grid grid-cols-2 gap-6 mt-12">
        <OlympiadHeats olympiad={olympiad} cases={cases} />
        <OlympiadEvents olympiadId={olympiad.id} events={olympiad.events} />
      </div>
    </>
  );
}
