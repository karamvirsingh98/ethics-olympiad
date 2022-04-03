import { authenticate } from "@feathersjs/authentication/lib/hooks";
import { HookContext } from "@feathersjs/feathers";

const updateJudgeScore = () => {
  return async (context: HookContext) => {
    const { eventID, judgeName, heatNumber } = context.data;
    context.app
      .service("/api/active")
      .updateJudgeScore(eventID, judgeName, heatNumber);
    return context;
  };
};

export const SCORE_HOOKS = {
  before: {
    get: [authenticate("jwt")],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")],
  },
  after: {
    create: [updateJudgeScore()],
  },
};
