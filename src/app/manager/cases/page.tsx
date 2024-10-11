import { CaseDetails } from "@/components/case-details";
import { LevelSelector } from "@/components/level-selector";
import { NewCase } from "@/components/new-case";
import { db } from "@/lib/db";
import { zOlympiadLevel } from "@/lib/entities";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function CasesPage({
  searchParams: { level },
}: {
  searchParams: { level?: zOlympiadLevel };
}) {
  const cases = await db.query.CasesTable.findMany({
    where: (table, { eq }) => (level ? eq(table.level, level) : undefined),
  });

  const questions = await db.query.QuestionsTable.findMany();

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
      <div className="grid grid-cols-3 gap-4">
        {cases.reverse().map((details) => (
          <CaseDetails
            key={details.id}
            details={details}
            question={questions.find((c) => c.caseId === details.id)}
          />
        ))}
      </div>
    </>
  );
}
