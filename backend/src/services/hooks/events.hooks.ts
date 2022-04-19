import { authenticate } from "@feathersjs/authentication/lib/hooks";
import { HookContext } from "@feathersjs/feathers";
import { Event } from "@ethics-olympiad/types";

const protectEvents = () => {
  return async (context: HookContext) => {
    if (!context.params.user)
      context.result = context.result.map(
        ({ _id, eventTitle, templateID }: Event) => ({
          _id,
          eventTitle,
          templateID,
        })
      );
    return context;
  };
};

const deleteScoresWhenEventDeleted = () => {
  return async (context: HookContext) => {
    console.log(context.id);
  };
};

export const EVENT_HOOKS = {
  before: {
    get: [authenticate("jwt")],
    create: [authenticate("jwt")],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    find: [protectEvents()],
    remove: [deleteScoresWhenEventDeleted()],
  },
};
