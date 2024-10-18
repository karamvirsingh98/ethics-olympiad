import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const PUSHER_FORMATS = {
  OLYMPIAD_CHANNEL: (id: number) => `private-olympiad-${id}`,
  SCORE_SUBMISSION: (id: number) => `client-submission-${id}`,
  JUDGE_UPDATE: (id: number) => `client-update-${id}`,
};

export const OLYMPIAD_TIMER_LABELS = [
  "Discussion",
  "Presentation",
  "Discussion",
  "Commentary",
  "Discussion",
  "Response",
  "Judges Q&A",
];
