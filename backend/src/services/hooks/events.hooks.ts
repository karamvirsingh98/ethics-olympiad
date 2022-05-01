import { authenticate } from "@feathersjs/authentication/lib/hooks";
import { HookContext } from "@feathersjs/feathers";
import { Event, Score } from "@ethics-olympiad/types";

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

const handleEventDelete = () => {
  return async (context: HookContext) => {
    const id = context.id;
    const scoresToRemove = await context.app
      .service("api/scores")
      .find({ query: { eventID: id } });
    await Promise.all(
      scoresToRemove.map((score: Score) =>
        context.app.service("api/events").remove(score._id)
      )
    );
    return context;
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
    remove: [handleEventDelete()],
  },
};
