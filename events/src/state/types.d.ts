export interface User {
  _id: string;
  name: string;
  email: string;
  admin: boolean;
}

export interface Olympiad {
  event: Event;
  cases: Cases;
}

export interface BaseEvent {
  _id: string;
  title: string;
}

export interface Event extends BaseEvent {
  timers: number[];
  heats: Heat[];
  teams: Team[];
}

export interface Heat {
  case1: string;
  case2: string;
}

export interface Team {
  name: string;
  present: boolean;
}

export interface Cases {
  [id: string]: Case;
}

export interface Case {
  _id?: string;
  owner: string;
  title: string;
  question: string;
  isVideo: boolean;
  videoURL?: string;
  bodyText?: string;
}


export interface ActiveEvent {
  eventID: string;
  status: EventStatus;
  scores: ScoreStatus;
}

export interface EventStatus {
  [judgeName: string]: Status;
}

export interface Status {
  heatNumber: number;
  roundNumber: number;
  stageNumber: number;
}
export interface ScoreStatus {
  [judgeName: string]: boolean[];
}
