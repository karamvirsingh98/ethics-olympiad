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
}

export interface ActiveEvent {
  eventID: string;
  status: EventStatus;
  scores: ScoreStatus;
  teams: Team[]
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
  eventID: string;
  judgeName: string;
  heatNumber: number;
  teamA: string;
  teamB: string;
  scoreA: TeamScore;
  scoreB: TeamScore;
  submitted?: boolean;
}

