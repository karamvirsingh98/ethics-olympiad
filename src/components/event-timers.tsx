"use client";

import { UpdateEventAction } from "@/lib/actions";
import { useAction } from "next-safe-action/hooks";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { OLYMPIAD_TIMER_LABELS } from "@/lib/utils";

export const EventTimers = ({
  eventId,
  timers,
}: {
  eventId: number;
  timers: number[];
}) => {
  const { execute, isPending } = useAction(UpdateEventAction);

  return (
    <div className="p-4 border rounded-md flex flex-col gap-4">
      <p className="text-xl font-bold mb-4">Timers</p>
      {timers.map((length, i) => (
        <div key={i} className="pb-2 border-b last:pb-0 last:border-none">
          <p className="mb-2 text-sm text-muted-foreground">
            {OLYMPIAD_TIMER_LABELS[i]}
          </p>
          <div className="flex items-center justify-between gap-2">
            <Button
              size="icon"
              variant="ghost"
              disabled={isPending}
              onClick={() => {
                timers[i] -= 1;
                execute({ id: eventId, timers });
              }}
            >
              <MinusIcon className="w-4" />
            </Button>
            <p className="text-2xl">{length}</p>
            <Button
              size="icon"
              variant="ghost"
              disabled={isPending}
              onClick={() => {
                timers[i] += 1;
                execute({ id: eventId, timers });
              }}
            >
              <PlusIcon className="w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
