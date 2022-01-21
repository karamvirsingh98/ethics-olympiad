import { useAppState } from "./hooks";

export type AppState = ReturnType<typeof useAppState>

export interface Collection<T> {
  [id: string]: T
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

export type Events = Collection<Event>;

export interface Event {
  _id?: string;
  owner: string;
  title: string;
  heats: Heat[];
  teams: Team[];
  timers: number[];
}

export interface Heat {
  case1: CaseID,
  case2: CaseID
}

export interface Team {
  name: string,
  present: boolean
}

export type Cases = Collection<Case>

export interface Case {
  _id?: CaseID = string;
  owner: string;
  title: string;
  isVideo: boolean;
  videoURL?: string;
  bodyText?: string;
}

export type CaseID = string;
