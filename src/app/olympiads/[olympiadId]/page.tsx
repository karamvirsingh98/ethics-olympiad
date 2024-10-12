import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Olympiad } from "@/components/olympiad";

export default async function OlympiadPage({
  params,
}: {
  params: { olympiadId: string };
}) {
  const olympiadId = Number(params.olympiadId);

  if (!olympiadId) return redirect("/olympiads");

  const event = await db.query.EventsTable.findFirst({
    where: (table, { eq }) => eq(table.id, olympiadId),
  });

  if (!event) return redirect("/olympiads");

  const template = await db.query.TemplatesTable.findFirst({
    where: (table, { eq }) => eq(table.id, event.templateId),
  });

  if (!template) return redirect("/olympiads");

  const caseIds = template?.heats.reduce(
    (arr, h) => [...arr, h.case1, h.case2],
    [] as number[]
  );

  const cases = await db.query.CasesTable.findMany({
    where: (table, { inArray }) => inArray(table.id, caseIds),
  });

  const questions = await db.query.QuestionsTable.findMany({
    where: (table, { inArray }) => inArray(table.caseId, caseIds),
  });

  const judge = cookies().get("judge-name")?.value ?? "";
  const results = await db.query.ResultsTable.findMany({
    where: (table, { eq, and }) =>
      and(eq(table.eventId, olympiadId), eq(table.judge, judge)),
  });

  return (
    <Olympiad
      cases={cases}
      event={event}
      heats={template.heats}
      questions={questions}
      results={results}
    />
  );
}
