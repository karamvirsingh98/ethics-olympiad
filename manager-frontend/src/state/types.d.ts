export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface OlympaidEvents {
  [id: string]: OlympiadEvent;
}

export interface OlympiadEvent {
  _id?: string;
  owner: string;
  title: string;
  numHeats: number;
  timers: number[];
  caseIDs: string[];
}

export interface OlympaidCases {
  [id: string]: OlympiadCase;
}

export interface OlympiadCase {
  _id?: string;
  owner: string;
  title: string;
  isVideo: boolean;
  videoURL?: string;
  bodyText?: string;
}
