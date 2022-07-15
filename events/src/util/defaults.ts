import { Score, TeamScore } from "@ethics-olympiad/types";

export const DEFAULT_SCORE: TeamScore = {
  clarity: 0,
  centrality: 0,
  thoughtfulness: 0,
  response: 0,
  judgeResponse: 0,
  commentary: 0,
  respectful: 0,
};

export const BASE_SCORE = {
  teamA: "",
  teamB: "",
  honorableA: false,
  honorableB: false,
  scoreA: DEFAULT_SCORE,
  scoreB: DEFAULT_SCORE,
};

export function getDefaultFullScore(
  judgeName: string,
  eventID: string,
  heatNumber: number
): Score {
  return {
    eventID,
    judgeName,
    heatNumber,
    ...BASE_SCORE,
  };
}
