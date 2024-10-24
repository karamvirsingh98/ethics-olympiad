import { CaseDetails } from "@/components/cases/case-details";
import { LevelSelector } from "@/components/level-selector";
import { NewCase } from "@/components/cases/new-case";
import { db } from "@/lib/db";
import { zOlympiadLevel } from "@/lib/entities";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { parseTokenFromCookies } from "@/lib/server-utils";

export default async function CasesPage({
  searchParams: { level },
}: {
  searchParams: { level?: zOlympiadLevel };
}) {
  const { userId } = parseTokenFromCookies();

  const update_level = async (level: zOlympiadLevel | "All") => {
    "use server";
    redirect(`/manager/cases${level !== "All" ? `?level=${level}` : ""}`);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-5xl font-bold">Cases</h1>
        <div className="flex gap-4">
          <Suspense key={level}>
            <LevelSelector value={level} onChange={update_level} showAll />
          </Suspense>
          <NewCase />
        </div>
      </div>
      <Suspense key={level} fallback={<ReloadIcon className="animate-spin" />}>
        <CasesList userId={userId} level={level} />
      </Suspense>
    </>
  );
}

const CasesList = async ({
  userId,
  level,
}: {
  userId: number;
  level: zOlympiadLevel | undefined;
}) => {
  const cases = await db.query.CasesTable.findMany({
    where: (table, { and, eq }) =>
      and(eq(table.userId, userId), level ? eq(table.level, level) : undefined),
    with: { questions: { where: (table, { eq }) => eq(table.userId, userId) } },
  });

  return (
    <div className="grid grid-cols-3 gap-4">
      {cases.reverse().map((details) => (
        <CaseDetails
          key={details.id}
          details={details}
          question={details.questions[0]}
        />
      ))}
    </div>
  );
};
