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
  if (!olympiadId) return redirect("/");

  const judge = cookies().get("judge-name")?.value ?? "";
  if (!judge) return redirect("/");

  const event = await db.query.EventsTable.findFirst({
    where: (table, { eq }) => eq(table.id, olympiadId),
    with: {
      template: true,
      results: { where: (table, { eq }) => eq(table.judge, judge) },
    },
  });

  if (!event) return redirect("/");

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

  return (
    <Olympiad
      judge={judge}
      cases={cases}
      event={event}
      heats={event.template.heats}
      results={event.results}
      questions={cases.map((c) => c.questions[0])}
    />
  );
}
