import { Case, Event, Levels } from "@ethics-olympiad/types";

export function getDefaultEvent(templateID: string): Event {
  return {
    templateID,
    eventTitle: "New Olympiad",
    teams: [],
  };
}

export function getDefaultCase(userID: string, isVideo: boolean, level: Levels): Case {
  return {
    owner: userID,
    title: "New Case",
    question: "",
    isVideo: isVideo,
    level,
  }
}