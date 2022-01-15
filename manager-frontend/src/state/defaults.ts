import { Case, Event } from "./types";

export function getDefaultEvent(): Event {
  return {
    // owner: user._id,
    title: "New Olympiad",
    heats: [],
    teams: [],
    timers: [3, 5, 1, 3, 1, 3, 7],
  };
}

export function getDefaultCase(): Case {
  return {
    // owner: user._id,
    title: "New Case",
    isVideo: false
  }
}