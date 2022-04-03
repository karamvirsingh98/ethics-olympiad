import { Case, Event, Levels, Template } from "@ethics-olympiad/types";

export function getDefaultTemplate(userID: string, level: Levels): Template {
  return {
    owner: userID,
    templateTitle: "",
    heats: [],
    timers: [3, 5, 1, 3, 1, 3, 7],
    level,
  };
}

export function getDefaultEvent(templateID: string): Event {
  return {
    templateID,
    eventTitle: "",
    teams: [],
  };
}

export function getDefaultCase(
  userID: string,
  isVideo: boolean,
  level: Levels
): Case {
  return {
    owner: userID,
    title: "New Case",
    question: "",
    isVideo: isVideo,
    level,
  };
}
