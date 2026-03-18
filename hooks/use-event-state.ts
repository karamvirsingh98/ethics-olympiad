"use client";

import { useChannel, usePresence } from "ably/react";
import { useEffect, useState } from "react";

import { DEFAULT_TIMERS } from "@/lib/timing";

const INIT_JUDGE_STATE = { round: 0, stage: 0, time: 0 };
export type JudgeState = typeof INIT_JUDGE_STATE;

const getStoredState = (eventId: number) => {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(`olympiad-${eventId}`);
  return stored ? JSON.parse(stored) : null;
};

export const useEventState = (eventId: number, judgeId: number) => {
  const [{ round, stage, time }, set] = useState<JudgeState>(
    getStoredState(eventId) || INIT_JUDGE_STATE
  );

  const { publish } = useChannel(`event-${eventId}`);
  usePresence(`event-${eventId}`);

  useEffect(() => {
    const stringified = JSON.stringify({ round, stage, time });
    localStorage.setItem(`olympiad-${eventId}`, stringified);

    // broadcast state on ably channel
    publish(judgeId.toString(), stringified);
  }, [eventId, judgeId, round, stage, time, publish]);

  const [started, setStarted] = useState(false);

  // tick the clock when started
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

  const timer = (stage: number) => DEFAULT_TIMERS[stage] * 60;

  const next = () => {
    if (round === 0) return set({ round: 1, stage: 0, time: 0 });
    if (round === 1 && stage === 7) return set({ round: 2, stage: 0, time: 0 });
    if (stage < 7) return set({ round, stage: stage + 1, time: timer(stage) });
  };

  const prev = () => {
    if (round === 0) return;
    if (round === 1 && stage === 0) return set({ round: 0, stage: 0, time: 0 });
    if (round === 2 && stage === 0)
      return set({ round: 1, stage: 7, time: timer(6) });
    if (stage > 0)
      return set({ round, stage: stage - 1, time: timer(stage - 1) });
  };

  return {
    round,
    stage,
    time,
    next,
    prev,
    start: () => setStarted(true),
    pause: () => setStarted(false),
    reset: () => {
      set((state) => ({ ...state, time: timer(stage - 1) }));
      setStarted(false);
    },
  };
};
