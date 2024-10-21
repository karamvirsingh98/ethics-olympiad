import { LevelSelector } from "@/components/level-selector";
import { NewTemplate } from "@/components/template/new-template";
import { db } from "@/lib/db";
import { zOlympiadLevel } from "@/lib/entities";
import { parse_jwt_payload } from "@/lib/jwt";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function ManagerEventsPage({
  searchParams: { level },
}: {
  searchParams: { level?: zOlympiadLevel };
}) {
  const token = cookies().get("auth-token")?.value;
  if (!token) redirect("/");
  const { userId } = parse_jwt_payload<{ userId: number }>(token);

  const update_level = async (level: zOlympiadLevel | "All") => {
    "use server";
    redirect(`/manager/events${level !== "All" ? `?level=${level}` : ""}`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Templates</h1>
        <div className="flex gap-4">
          <LevelSelector value={level} onChange={update_level} showAll />
          <NewTemplate />
        </div>
      </div>
      <Suspense key={level} fallback={<ReloadIcon className="animate-spin" />}>
        <TemplatesList userId={userId} level={level} />
      </Suspense>
    </>
  );
}

const TemplatesList = async ({
  userId,
  level,
}: {
  userId: number;
  level: zOlympiadLevel | undefined;
}) => {
  const templates = await db.query.TemplatesTable.findMany({
    where: (table, { and, eq }) =>
      and(eq(table.userId, userId), level ? eq(table.level, level) : undefined),
    with: { events: { columns: { id: true } } },
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map((t) => (
        <Link
          key={t.id}
          href={"/manager/events/" + t.id}
          className="p-4 border rounded-md hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 transition-all"
        >
          <p className="text-lg font-semibold mb-4">{t.title}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <p className="pr-4 border-r">{t.level} Level</p>
            <p className="pr-4 border-r">{t.heats.length} Heats</p>
            <p>{t.events.length} Events</p>
          </div>
        </Link>
      ))}
    </div>
  );
};
