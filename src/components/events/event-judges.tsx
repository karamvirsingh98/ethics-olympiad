"use client";

import { zJudgeUpdate } from "@/lib/entities";
import { useEffect, useState } from "react";
import { usePusher } from "@/lib/pusher";
import { PUSHER_FORMATS } from "@/lib/utils";

export const EventJudges = ({ eventId }: { eventId: number }) => {
  const [judges, setJudges] = useState<Record<string, zJudgeUpdate>>({});

  const listener = usePusher(eventId);

  useEffect(() => {
    const handler = (data: zJudgeUpdate) =>
      setJudges({ ...judges, [data.judge]: data });

    listener.bind(PUSHER_FORMATS.JUDGE_UPDATE(eventId), handler);
    return () => {
      listener.unbind(PUSHER_FORMATS.JUDGE_UPDATE(eventId), handler);
    };
  });

  return (
    <div className="w-full p-4 border rounded-md flex flex-col gap-4">
      <p className="mb-4 text-xl font-bold">Judges</p>
      {Object.values(judges).map((j) => (
        <div
          key={j.judge}
          className="px-4 py-2 border rounded-md flex items-center justify-between"
        >
          {j.judge}
          <div className="flex items-center gap-4">
            {!!j.heat && (
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">HEAT</p>
                <p className="text-xl font-bold">{j.heat}</p>
              </div>
            )}
            {j.round === 3 ? (
              <p className="pl-4 border-l text-muted-foreground">
                CURRENTLY SCORING
              </p>
            ) : (
              !!j.round && (
                <div className="pl-4 border-l flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">ROUND</p>
                  <p className="text-xl font-bold">{j.round}</p>
                </div>
              )
            )}
            {!!j.stage && (
              <div className="pl-4 border-l flex items-center gap-2">
                <p className="text-sm text-muted-foreground">STAGE</p>
                <p className="text-xl font-bold">{j.stage}</p>
              </div>
            )}
            {!!j.time && (
              <div className="pl-4 border-l flex items-center gap-2">
                <p className="text-sm text-muted-foreground">TIME</p>
                <p className="text-xl font-bold w-12">
                  <Time time={j.time} />
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const Time = ({ time }: { time: number }) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return (
    <>
      {minutes}:{seconds < 10 ? "0" + seconds : seconds}
    </>
  );
};
