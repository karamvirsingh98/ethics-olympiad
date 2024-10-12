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
    <div className="p-4 border rounded-md">
      <p className="text-xl font-bold mb-8">Timers</p>
      <div className="flex gap-2">
        {timers.map((length, i) => (
          <div
            key={i}
            className="w-full pr-2 border-r last:pr-0 last:border-none"
          >
            <p className="mb-2 text-sm text-muted-foreground whitespace-nowrap">
              {OLYMPIAD_TIMER_LABELS[i]}
            </p>
            <div className="flex items-center justify-between gap-2">
              <Button
                size="icon"
                className="w-6 h-6"
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
                className="w-6 h-6"
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
    </div>
  );
};
