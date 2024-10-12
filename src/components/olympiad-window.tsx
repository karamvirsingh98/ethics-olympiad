"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { SendJudgeUpdateAction } from "@/lib/actions";
import { CaretLeftIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { Suspense, useEffect } from "react";
import { OlympiadCountdown } from "./olympiad-countdown";
import { OLYMPIAD_TIMER_LABELS } from "@/lib/utils";

export const OlympiadWindow = ({
  olympiadId,
  timers,
  question,
  heat,
  round,
  stage,
}: {
  olympiadId: number;
  timers: number[];
  question: string;
  heat: number;
  round: number;
  stage: number;
}) => {
  useEffect(() => {
    SendJudgeUpdateAction({
      eventId: olympiadId,
      heat,
      round,
      stage,
    });
  }, [heat, olympiadId, round, stage]);

  const base_href = `/olympiads/${olympiadId}?heat=${heat}&`;

  return (
    <div className="p-4 border rounded-md flex lg:flex-col gap-8">
      <div className="flex flex-col pr-8 border-r lg:pr-0 lgborder-r-0 lg:flex-row items-center justify-between">
        {/* back button */}
        <Link href={base_href + `round=${round}&stage=${stage - 1}`}>
          <Button variant="outline" className="w-36 justify-between">
            <CaretLeftIcon className="w-4" />
            Back
          </Button>
        </Link>

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

        {/* forward button */}
        <Link
          href={
            stage === 7
              ? base_href + `round=${round + 1}`
              : base_href + `round=${round}&stage=${stage + 1}`
          }
        >
          <Button variant="outline" className="w-36 justify-between">
            {stage === 7 ? (round === 2 ? "End Heat" : "Next Stage") : "Next"}
            <CaretRightIcon className="w-4" />
          </Button>
        </Link>
      </div>
      <div className="lg:px-8 min-h-[60vh] flex flex-col lg:flex-row lg:items-center justify-between">
        <p className="max-w-[60%] text-5xl">{question}</p>
        <Suspense key={`${heat}-${round}-${stage}`}>
          <OlympiadCountdown duration={timers[stage - 1] * 60} />
        </Suspense>
      </div>
    </div>
  );
};
