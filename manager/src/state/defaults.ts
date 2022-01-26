import { Case, Event, User } from "./types";

export function getDefaultEvent(userID: string): Event {
  return {
    owner: userID,
    title: "New Olympiad",
    heats: [],
    teams: [],
    timers: [3, 5, 1, 3, 1, 3, 7],
  };
}

export function getDefaultCase(userID: string, isVideo: boolean): Case {
  return {
    owner: userID,
    title: "New Case",
    question: "",
    isVideo: isVideo
  }
}