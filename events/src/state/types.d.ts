import { Case, Heat, Team } from "@ethics-olympiad/types";

export interface Olympiad {
  event: Event;
  cases: Cases;
}

export interface BaseEvent {
  _id: string;
  eventTitle: string;
  templateTitle: string;
}

export interface Event extends BaseEvent {
  timers: number[];
  heats: Heat[];
  teams: Team[];
}

export interface Cases {
  [id: string]: Case;
}
