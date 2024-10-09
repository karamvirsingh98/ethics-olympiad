import { OlympiadCountdown } from "@/components/olympiad-countdown";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import {
  CaretLeftIcon,
  CaretRightIcon,
  HomeIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { OlympiadScores } from "@/components/olympiad-scores";

export default async function OlympiadPage({
  params,
  searchParams,
}: {
  params: { eventId: string };
  searchParams: {
    heat?: string;
    round?: string;
    stage?: string;
  };
}) {
  const eventId = Number(params.eventId);
  const heat = Number(searchParams.heat);
  const round = Number(searchParams.round);
  const stage = Number(searchParams.stage);

  if (!eventId) return redirect("/olympiads");

  const event = await db.query.EventsTable.findFirst({
    where: (table, { eq }) => eq(table.id, eventId),
  });

  if (!event) return redirect("/olympiads");

  const template = await db.query.TemplatesTable.findFirst({
    where: (table, { eq }) => eq(table.id, event.templateId),
  });

  if (!template) return redirect("/olympiads");

  const cases = await db.query.CasesTable.findMany({
    where: (table, { inArray }) =>
      inArray(
        table.id,
        template?.heats.reduce(
          (arr, h) => [...arr, h.case1, h.case2],
          [] as number[]
        )
      ),
  });

  const caseId =
    !!heat &&
    !!round &&
    template.heats[heat - 1][round === 1 ? "case1" : "case2"];

  return (
    <>
      <div className="px-4 flex justify-between">
        <h1 className="text-5xl font-bold">{event.title}</h1>
        <div className="flex gap-4">
          <Link href={`/olympiads/${eventId}`}>
            <Button variant="outline">
              Home <HomeIcon className="w-4 ml-4" />
            </Button>
          </Link>
        </div>
      </div>

      {!heat && !round && !stage && (
        <div className="min-h-[50vh] grid place-items-center">
          <div className="flex gap-4 justify-center">
            {template.heats.map((heat, i) => (
              <div
                key={i}
                className="p-4 border rounded-md flex flex-col gap-2 "
              >
                <p className="text-xl font-semibold mb-4">Heat {i + 1}</p>
                <div className="w-96 overflow-ellipsis line-clamp-1">
                  Case 1: {cases.find((c) => c.id === heat.case1)?.title}
                </div>
                <div className="w-96 overflow-ellipsis line-clamp-1">
                  Case 2: {cases.find((c) => c.id === heat.case2)?.title}
                </div>
                <div className="mt-4 flex gap-4 justify-end">
                  <Link href={`/olympiads/${eventId}?heat=${i + 1}&round=3`}>
                    <Button variant="outline">
                      Scores <StarIcon className="w-4 ml-4" />
                    </Button>
                  </Link>
                  <Link href={`/olympiads/${eventId}?heat=${i + 1}&round=1`}>
                    <Button variant="secondary">
                      Start <CaretRightIcon className="w-4 ml-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!!heat && (round === 1 || round === 2) && !stage && (
        <div className="p-4 border rounded-md flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">
              {cases.find((c) => c.id === caseId)?.title}
            </p>
            <Link
              href={`/olympiads/${eventId}?heat=${heat}&round=${round}&stage=1`}
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
        <div className="p-4 border rounded-md flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <Link
              href={`/olympiads/${eventId}?heat=${heat}&round=${round}&stage=${
                stage - 1
              }`}
            >
              <Button variant="outline" className="w-36 justify-between">
                <CaretLeftIcon className="w-4" />
                Back
              </Button>
            </Link>

            <div className="flex items-center">
              {[
                "Discussion",
                "Presentation",
                "Discussion",
                "Commentary",
                "Discussion",
                "Response",
                "Judges Q&A",
              ].map((text, i) => (
                <Button
                  key={text}
                  className="w-32 pointer-events-none"
                  variant={stage === i + 1 ? "secondary" : "ghost"}
                >
                  {text}
                </Button>
              ))}
            </div>

            <Link
              href={
                stage === 7
                  ? round === 1
                    ? `/olympiads/${eventId}?heat=${heat}&round=2` // go to round 2
                    : `/olympiads/${eventId}?heat=${heat}&round=3` // go to scores
                  : `/olympiads/${eventId}?heat=${heat}&round=${round}&stage=${
                      stage + 1
                    }` //next stage
              }
            >
              <Button variant="outline" className="w-36 justify-between">
                {stage === 7
                  ? round === 2
                    ? "End Heat"
                    : "Next Stage"
                  : "Next"}
                <CaretRightIcon className="w-4" />
              </Button>
            </Link>
          </div>
          <div className="px-8 min-h-[60vh] flex items-center justify-between">
            <div className="max-w-[60%]">
              <p className="text-3xl text-muted-foreground">Question:</p>
              <p className="text-5xl mt-4">
                {cases.find((c) => c.id === caseId)?.content.slice(0, 200)}?
              </p>
            </div>
            <Suspense key={`${heat}-${round}-${stage}`}>
              <OlympiadCountdown duration={event.timers[stage - 1] * 60} />
            </Suspense>
          </div>
        </div>
      )}

      {!!heat && round === 3 && (
        <OlympiadScores eventId={eventId} heat={heat} teams={event.teams} />
      )}
    </>
  );
}
