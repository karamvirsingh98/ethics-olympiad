export interface User {
  _id: string;
  name: string;
  email: string;
  admin: boolean;
  permissions?: Levels[];
  createdAt: string;
}

export interface Invite {
  name: string;
  email: string;
  key?: string;
  expiry?: number;
}

export type Levels = "junior" | "middle" | "senior" | "tertiary";

export interface Template {
  _id?: string;
  owner: string;
  templateTitle: string;
  heats: Heat[];
  timers: number[];
  level: Levels;
}

export interface Event {
  _id?: string;
  templateID: string;
  eventTitle: string;
  teams: Team[];
  password?: string;
}

export interface Heat {
  case1: string;
  case2: string;
}

export interface Team {
  teamName: string;
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
  level: Levels;
  isOfficial: boolean;
}
export interface ActiveEvent {
  eventID: string;
  status: EventStatus;
  scores: ScoreStatus;
  teams: Team[];
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
  [judgeName: string]: number;
}

export type ScoreFields = Record<
  keyof TeamScore,
  { description: string; max: number }
>;

export interface TeamScore {
  //pertains to presetnation as team A
  clarity: number; // 0 - 5
  centrality: number; //0 - 5
  thoughtfulness: number; //0 - 5

  //pertains to responses as Team A
  response: number; // 0 - 15
  judgeResponse: number; //0 - 15

  //pertains to commentary as team B
  commentary: number; //0 - 10

  //pertains to respectfulness score
  respectful: number; //0 - 5
}

export interface Score {
  _id?: string;
  eventID: string;
  judgeName: string;
  heatNumber: number;
  teamA: string;
  teamB: string;
  honorableA: boolean;
  honorableB: boolean;
  scoreA: TeamScore;
  scoreB: TeamScore;
}

export interface CustomQuestion {
  _id: string;
  caseID: string;
  userID: string;
  question: string;
}
