import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const OLYMPIAD_TIMER_LABELS = [
  "Discussion",
  "Presentation",
  "Discussion",
  "Commentary",
  "Discussion",
  "Response",
  "Judges Q&A",
];
