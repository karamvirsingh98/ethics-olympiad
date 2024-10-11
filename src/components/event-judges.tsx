"use client";

import { zJudgeUpdate } from "@/lib/entities";
import { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";

export const EventJudges = ({ eventId }: { eventId: number }) => {
  const pusher_ref = useRef<Pusher>();
  const [judges, setJudges] = useState<Record<string, zJudgeUpdate>>({});

  useEffect(() => {
    if (!pusher_ref.current) {
      pusher_ref.current = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      });
      pusher_ref.current
        .subscribe("ethics-olympiad")
        .bind(`event-${eventId}-judge-update`, (data: zJudgeUpdate) =>
          setJudges({ ...judges, [data.judge]: data })
        );
    }
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
            <div className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">HEAT</p>
              <p className="text-xl font-bold">{j.heat}</p>
            </div>
            {j.round && j.round === 3 ? (
              <p className="pl-4 border-l text-muted-foreground">
                CURRENTLY SCORING
              </p>
            ) : (
              <div className="pl-4 border-l flex items-center gap-2">
                <p className="text-sm text-muted-foreground">ROUND</p>
                <p className="text-xl font-bold">{j.round}</p>
              </div>
            )}
            {j.stage && (
              <div className="pl-4 border-l flex items-center gap-2">
                <p className="text-sm text-muted-foreground">STAGE</p>
                <p className="text-xl font-bold">{j.stage}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
