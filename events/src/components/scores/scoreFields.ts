import { TeamScore } from "@ethics-olympiad/types";

type ScoreFields = Record<
  keyof TeamScore,
  { description: string; max: number }
>;

export const SCORE_FIELDS: ScoreFields = {
  clarity: {
    max: 5,
    description: "Was this team's presentation clear and systematic?",
  },
  centrality: {
    max: 5,
    description:
      "Did the team's presentation identify and thoroughly discuss the central moral dimensions of the case?",
  },
  thoughtfulness: {
    max: 5,
    description:
      "Did the team's presentation indicate both awareness and thoughtful consideration of different viewpoints, including those that would loom large in the reasoning of individuals who didagree with the teams position?",
  },
  response: {
    max: 15,
    description:
      "Did this team's response to the commentary adequately address the questions, concerns, and comments raised by the other team?",
  },
  judgeResponse: {
    max: 15,
    description:
      "To what extent did this team succeed in identifying the central point of your questions, and respoinding to them clearly and effectively.",
  },
  commentary: {
    max: 10,
    description:
      "To what extent has the team effectively dealt with the presenting teams arguments?",
  },
  respectful: {
    max: 5,
    description:
      '"Has this team been consistently respectful of the other team?"',
  },
};
