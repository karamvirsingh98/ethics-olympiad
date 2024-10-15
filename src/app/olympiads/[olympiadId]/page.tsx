import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Olympiad } from "@/components/olympiad/olympiad";

export default async function OlympiadPage({
  params,
}: {
  params: { olympiadId: string };
}) {
  const olympiadId = Number(params.olympiadId);

  if (!olympiadId) return redirect("/olympiads");

  const event = await db.query.EventsTable.findFirst({
    where: (table, { eq }) => eq(table.id, olympiadId),
    with: { template: true },
  });

  if (!event) return redirect("/olympiads");

  const caseIds = event.template?.heats.reduce(
    (arr, h) => [...arr, h.case1, h.case2],
    [] as number[]
  );

  const cases = await db.query.CasesTable.findMany({
    where: (table, { inArray }) => inArray(table.id, caseIds),
    with: {
      questions: {
        where: (table, { eq }) => eq(table.userId, event.template.userId),
      },
    },
  });

  const questions = await db.query.QuestionsTable.findMany({
    where: (table, { and, eq, inArray }) =>
      and(
        eq(table.userId, event.template.userId),
        inArray(table.caseId, caseIds)
      ),
  });

  const judge = cookies().get("judge-name")?.value ?? "";
  const results = await db.query.ResultsTable.findMany({
    where: (table, { eq, and }) =>
      and(eq(table.eventId, olympiadId), eq(table.judge, judge)),
  });

  return (
    <Olympiad
      judge={judge}
      cases={cases}
      event={event}
      heats={event.template.heats}
      questions={questions}
      results={results}
    />
  );
}
