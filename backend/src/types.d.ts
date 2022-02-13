export interface User {
  _id: string;
  name: string;
  email: string;
  admin: boolean;
}

export interface Invite {
  name: string;
  email: string;
  key?: string;
  expiry?: number;
}

export interface Event {
  _id?: string;
  password?: string;
  owner: string;
  title: string;
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

export interface Case {
  _id?: string;
  owner: string;
  title: string;
  question: string;
  isVideo: boolean;
  videoURL?: string;
  bodyText?: string;
}

export interface ActiveEvents {
  [eventID: string]: ActiveEvent
}

export interface ActiveEvent {
  status: EventStatus;
  scores: ScoreStatus;
}

export interface EventStatus {
  [judgeName: string]: number
}

export interface ScoreStatus {
  [judgeName: string]: boolean[]
}