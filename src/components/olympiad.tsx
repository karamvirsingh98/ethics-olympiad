"use client";

import {
  CasesTable,
  EventsTable,
  QuestionsTable,
  ResultsTable,
} from "@/lib/schema";
import { InferSelectModel } from "drizzle-orm";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  CaretLeftIcon,
  CaretRightIcon,
  HomeIcon,
  PauseIcon,
  PlayIcon,
  ResetIcon,
  StarFilledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import { zJudgeUpdate, zOlympiadHeats } from "@/lib/entities";
import { OLYMPIAD_TIMER_LABELS } from "@/lib/utils";
import { OlympiadScores } from "./olympiad-scores";

import { usePusher } from "@/lib/hooks";

const DEFAULT_STATE = { heat: 0, round: 0, stage: 0, time: 0 };

export const Olympiad = ({
  judge,
  event,
  cases,
  questions,
  results,
  heats,
}: {
  judge: string;
  event: InferSelectModel<typeof EventsTable>;
  cases: InferSelectModel<typeof CasesTable>[];
  questions: InferSelectModel<typeof QuestionsTable>[];
  results: InferSelectModel<typeof ResultsTable>[];
  heats: zOlympiadHeats;
}) => {
  const [{ heat, round, stage, time }, set] = useState(DEFAULT_STATE);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (started) {
      const interval = setInterval(() => {
        if (time) set((s) => ({ ...s, time: s.time - 1 }));
        else setStarted(false);
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  }, [started, time]);

  const pusher = usePusher(event.id);
  useEffect(() => {
    const update: zJudgeUpdate = {
      eventId: event.id,
      judge,
      heat,
      round,
      stage,
      time,
    };
    console.log(update);
    pusher.send_event(
      `client-event-${event.id}-judge-update`,
      update,
      `private-olympiad-${event.id}`
    );
  }, [event.id, heat, judge, pusher, round, stage, time]);

  const caseId =
    !!heat && !!round && heats[heat - 1][round === 1 ? "case1" : "case2"];

  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return (
    <>
      <div className="px-4 flex justify-between">
        <h1 className="text-5xl font-bold">{event.title}</h1>
        {!!heat && (
          <Button variant="outline" onClick={() => set(DEFAULT_STATE)}>
            Home <HomeIcon className="w-4 ml-4" />
          </Button>
        )}
      </div>

      {!heat && !round && !stage && (
        <div className="flex gap-4">
          {heats.map((heat, i) => {
            const scored = results.some((r) => r.heat === i + 1);
            return (
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
                  <Button
                    variant="outline"
                    disabled={scored}
                    onClick={() =>
                      set({ heat: i + 1, round: 3, stage: 0, time })
                    }
                  >
                    {scored ? "Scores Submitted" : "Submit Scores"}
                    {scored ? (
                      <StarFilledIcon className="w-4 ml-4 text-yellow-500" />
                    ) : (
                      <StarIcon className="w-4 ml-4" />
                    )}
                  </Button>
                  <Button
                    onClick={() => set({ heat: i + 1, round: 1, stage, time })}
                  >
                    Start <CaretRightIcon className="w-4 ml-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!!heat && (round === 1 || round === 2) && !stage && (
        <div className="p-4 border rounded-md flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <p className="text-3xl font-bold">
              {cases.find((c) => c.id === caseId)?.title}
            </p>
            <Button
              onClick={() =>
                set({ heat, round, stage: 1, time: event.timers[0] * 60 })
              }
            >
              Start Round
            </Button>
          </div>
          <div className="p-2 pl-4 border rounded-md bg-border/50">
            <p className="text-2xl whitespace-pre-line max-h-[60vh] pr-4 overflow-y-scroll">
              {cases.find((c) => c.id === caseId)?.content}
            </p>
          </div>
        </div>
      )}

      {!!heat && (round === 1 || round === 2) && !!stage && (
        <div className="p-4 border rounded-md flex lg:flex-col gap-8">
          <div className="flex flex-col pr-8 border-r lg:pr-0 lgborder-r-0 lg:flex-row items-center justify-between">
            {/* back button */}
            <Button
              variant="outline"
              className="w-36 justify-between"
              onClick={() =>
                set({
                  heat,
                  round,
                  stage: stage - 1,
                  time: stage <= 1 ? 0 : event.timers[stage - 2] * 60,
                })
              }
            >
              <CaretLeftIcon className="w-4" />
              Back
            </Button>

            {/* labels */}
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-0 items-center">
              {OLYMPIAD_TIMER_LABELS.map((label, i) => (
                <Button
                  key={label + i}
                  className="w-32 pointer-events-none"
                  variant={stage === i + 1 ? "secondary" : "ghost"}
                >
                  {label}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              className="w-36 justify-between"
              onClick={() =>
                set({
                  heat,
                  round: stage === 7 ? round + 1 : round,
                  stage: stage === 7 ? 0 : stage + 1,
                  time: stage === 7 ? 0 : event.timers[stage] * 60,
                })
              }
            >
              {stage === 7 ? (round === 2 ? "End Heat" : "Next Stage") : "Next"}
              <CaretRightIcon className="w-4" />
            </Button>
          </div>
          <div className="lg:px-8 min-h-[60vh] flex flex-col lg:flex-row lg:items-center justify-between">
            <p className="lg:max-w-[60%] text-5xl">
              {questions.find((q) => q.id === caseId)?.text ??
                "-- NO CASE SET --"}
            </p>
            <div className="max-w-[500px]">
              <div className="text-[12em] flex items-center justify-end leading-[1]">
                <p className="w-36 text-right">{minutes}</p>
                <p>:</p>
                <p className="w-64 text-right">
                  {seconds < 10 ? "0" + seconds : seconds}
                </p>
              </div>
              <div className="flex gap-4 justify-end px-8">
                {started && (
                  <Button variant="secondary" onClick={() => setStarted(false)}>
                    Pause <PauseIcon className="w-4 ml-4" />
                  </Button>
                )}
                {!started && (
                  <Button variant="secondary" onClick={() => setStarted(true)}>
                    Start <PlayIcon className="w-4 ml-4" />
                  </Button>
                )}
                {!started && time !== event.timers[stage - 1] * 60 && (
                  <Button
                    variant="secondary"
                    onClick={() =>
                      set((s) => ({ ...s, time: event.timers[stage - 1] * 60 }))
                    }
                  >
                    Reset <ResetIcon className="w-4 ml-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {!!heat && round === 3 && (
        <OlympiadScores
          heat={heat}
          eventId={event.id}
          teams={event.teams}
          submitted={results.some((r) => r.heat === heat)}
        />
      )}
    </>
  );
};
