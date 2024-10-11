import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { HomeIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import Link from "next/link";
import { OlympiadScores } from "@/components/olympiad-scores";
import { OlympiadWindow } from "@/components/olympiad-window";
import { OlympaidHeats } from "@/components/olympiad-heats";
import { cookies } from "next/headers";

export default async function OlympiadPage({
  params,
  searchParams,
}: {
  params: { olympiadId: string };
  searchParams: {
    heat?: string;
    round?: string;
    stage?: string;
  };
}) {
  const olympiadId = Number(params.olympiadId);
  const heat = Number(searchParams.heat);
  const round = Number(searchParams.round);
  const stage = Number(searchParams.stage);

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

  const caseId =
    !!heat &&
    !!round &&
    template.heats[heat - 1][round === 1 ? "case1" : "case2"];

  return (
    <>
      <div className="px-4 flex justify-between">
        <h1 className="text-5xl font-bold">{event.title}</h1>
        {!!heat && (
          <Link href={`/olympiads/${olympiadId}`}>
            <Button variant="outline">
              Home <HomeIcon className="w-4 ml-4" />
            </Button>
          </Link>
        )}
      </div>

      {!heat && !round && !stage && (
        <OlympaidHeats
          olympiadId={olympiadId}
          heats={template.heats}
          cases={cases}
          results={results}
        />
      )}

      {!!heat && (round === 1 || round === 2) && !stage && (
        <div className="p-4 border rounded-md flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">
              {cases.find((c) => c.id === caseId)?.title}
            </p>
            <Link
              href={`/olympiads/${olympiadId}?heat=${heat}&round=${round}&stage=1`}
            >
              <Button>Start Round</Button>
            </Link>
          </div>
          <div className="p-2 pl-4 border rounded-md bg-border/50">
            <p className="text-2xl whitespace-pre-line max-h-[60vh] pr-4 overflow-y-scroll">
              {cases.find((c) => c.id === caseId)?.content}
            </p>
          </div>
        </div>
      )}

      {!!heat && (round === 1 || round === 2) && !!stage && (
        <OlympiadWindow
          olympiadId={olympiadId}
          timers={event.timers}
          question={
            questions.find((q) => q.caseId === caseId)?.text ??
            "--QUESTION NOT SET--"
          }
          heat={heat}
          round={round}
          stage={stage}
        />
      )}

      {!!heat && round === 3 && (
        <OlympiadScores eventId={olympiadId} heat={heat} teams={event.teams} />
      )}
    </>
  );
}
