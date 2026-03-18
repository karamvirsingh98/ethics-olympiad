import { InsertScore } from "./schema";

export const INIT_SCORE: Omit<
  InsertScore,
  | "id"
  | "eventId"
  | "judgeId"
  | "createdAt"
  | "updatedAt"
  | "team"
  | "honorable"
> = {
  centrality: 0,
  clarity: 0,
  commentary: 0,
  judgeqa: 0,
  respectfulness: 0,
  response: 0,
  thoughtfulness: 0,
};

export const total_score = (score: typeof INIT_SCORE | undefined) => {
  if (!score) return 0;
  const fields = [
    "clarity",
    "centrality",
    "thoughtfulness",
    "response",
    "judgeqa",
    "commentary",
    "respectfulness",
  ] as const;
  return fields.reduce((sum, field) => (sum += score[field]), 0);
};
