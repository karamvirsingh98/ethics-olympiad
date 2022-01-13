export interface OlympiadEvent {
  _id?: string;
  owner: string;
  passkey: string;
  numHeats: number;
  timers: number[];
  caseIDs: string[];
}

export interface OlympiadCase {
  _id?: string;
  owner: string;
  isVideo: boolean;
  videoURL?: string;
  bodyText?: string;
}

export interface User {
  _id?: string,
  email: string,
  password: string
  
}
