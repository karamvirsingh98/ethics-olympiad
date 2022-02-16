export interface Invite {
  name: string;
  email: string;
  key?: string;
  expiry?: number;
}

export interface ActiveEvents {
  [eventID: string]: ActiveEvent;
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

export interface Score {
  judgeName: string;

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

  total: number
}