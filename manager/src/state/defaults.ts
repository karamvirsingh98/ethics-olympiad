import { Case, Event, Levels, Template, User } from "@ethics-olympiad/types";

export function getDefaultTemplate(
  userID: string,
  title: string,
  level: Levels
): Template {
  return {
    owner: userID,
    templateTitle: title,
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
  user: User,
  isVideo: boolean,
  level: Levels
): Case {
  return {
    owner: user._id,
    title: "New Case",
    question: "",
    isVideo: isVideo,
    level,
    isOfficial: user.admin ? true : false,
  };
}
