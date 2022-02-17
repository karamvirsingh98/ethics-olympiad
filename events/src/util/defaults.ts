import { Score } from "@ethics-olympiad/types";

export function getDefaultScore(judgeName: string): Score {
  return {
    judgeName,
    clarity: 0,
    centrality: 0,
    thoughtfulness: 0,
    response: 0,
    judgeResponse: 0,
    commentary: 0,
    respectful: 0,
    total: 0
  }
}