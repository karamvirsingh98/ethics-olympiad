"use client";

import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { useEventState } from "@/hooks/use-event-state";
import { Match } from "@/lib/schedule";
import { OlympiadHeat, SelectCase, SelectQuestion } from "@/lib/schema";
import { OLYMPIAD_TIMER_LABELS } from "@/lib/timing";

import { EmbeddedVideo } from "../embedded-video";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

export const ActiveMatch = ({
  judgeId,
  eventId,
  match,
  heats,
  cases,
}: {
  judgeId: number;
  eventId: number;
  match: Match;
  heats: OlympiadHeat[];
  cases: (SelectCase & { questions: SelectQuestion[] })[];
}) => {
  const { round, stage, time, next, prev, start, pause, reset } = useEventState(
    eventId,
    judgeId
  );

  return (
    <Card className="h-full ">
      <CardHeader className="border-b overflow-x-auto">
        <MatchControls round={round} stage={stage} next={next} prev={prev} />
      </CardHeader>
      <CardContent className="h-full min-h-0">
        {!round && !stage && <Welcome match={match} />}

        {!!round && !stage && (
          <CaseDisplay
            heat={heats[match.heat - 1]}
            round={round}
            cases={cases}
          />
        )}

        {!!round && !!stage && (
          <TimerDisplay time={time} start={start} pause={pause} reset={reset} />
        )}
      </CardContent>
    </Card>
  );
};

const MatchControls = ({
  round,
  stage,
  next,
  prev,
}: {
  round: number;
  stage: number;
  next: () => void;
  prev: () => void;
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <Button
        variant="ghost"
        onClick={prev}
        disabled={round === 0 && stage === 0}
      >
        <ChevronLeft /> Back
      </Button>
      <div className="flex-1 flex justify-center gap-2">
        {OLYMPIAD_TIMER_LABELS.map((label, i) => (
          <Button key={i} variant={stage === i + 1 ? "default" : "ghost"}>
            {label}
          </Button>
        ))}
      </div>
      <Button
        variant="ghost"
        onClick={next}
        disabled={round === 2 && stage === 7}
      >
        Next <ChevronRight />
      </Button>
    </div>
  );
};

const Welcome = ({ match }: { match: Match }) => {
  return (
    <div className="grid place-items-center h-full">
      <div className="flex flex-col items-center gap-4">
        <div className="text-2xl font-bold">{match.teamA}</div>
        <p>&</p>
        <div className="text-2xl font-bold">{match.teamB}</div>
      </div>
    </div>
  );
};

const CaseDisplay = ({
  heat,
  round,
  cases,
}: {
  heat: OlympiadHeat;
  round: number;
  cases: (SelectCase & { questions: SelectQuestion[] })[];
}) => {
  const [revealed, setRevealed] = useState(false);

  const case1 = cases.find((c) => c.id === heat.case1);
  const case2 = cases.find((c) => c.id === heat.case2);

  const currentCase = round === 1 ? case1 : case2;

  return (
    <>
      <div className="flex items-center justify-between pb-2 border-b mb-4">
        <p className="text-xl font-medium ">{currentCase?.name}</p>
        <Button onClick={() => setRevealed(!revealed)}>
          {revealed ? "Hide" : "Reveal"} Question{" "}
          {revealed ? <EyeOff /> : <Eye />}
        </Button>
      </div>
      {revealed ? (
        <p className="grid place-items-center h-full">
          <p className="text-4xl max-w-2xl text-center">
            {currentCase?.questions?.[0]?.text}
          </p>
        </p>
      ) : (
        <div className="h-full overflow-y-auto pb-16 text-lg whitespace-pre-line">
          {currentCase?.isVideo ? (
            <EmbeddedVideo url={currentCase.bodytext} />
          ) : (
            <p>{currentCase?.bodytext}</p>
          )}
        </div>
      )}
    </>
  );
};

const TimerDisplay = ({
  time,
  start,
  pause,
  reset,
}: {
  time: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
}) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return (
    <div className="grid place-items-center h-full">
      <div className="flex gap-8 items-center">
        <div className="text-[12rem] font-bold leading-0 font-mono flex items-center gap-2">
          <p>{minutes.toString().padStart(2, "0")}</p>
          <p className="pb-4">:</p>
          <p>{seconds.toString().padStart(2, "0")}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={start}>Start</Button>
          <Button onClick={pause} variant="secondary">
            Pause
          </Button>
          <Button onClick={reset} variant="destructive">
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
