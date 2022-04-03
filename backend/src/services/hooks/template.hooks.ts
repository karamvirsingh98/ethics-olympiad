import { HookContext } from "@feathersjs/feathers";
import { authenticate } from "@feathersjs/authentication/lib/hooks";
import { Event } from "@ethics-olympiad/types";

const handleTemplateDelete = () => {
  return async (context: HookContext) => {
    const id = context.id;
    const eventsToRemove = await context.app
      .service("api/events")
      .find({ query: { templateID: id } });
    await Promise.all(
      eventsToRemove.map((event: Event) =>
        context.app.service("api/events").remove(event._id)
      )
    );
    return context;
  };
};

export const TEMPLATE_HOOKS = {
  before: {
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")],
  },
  after: {
    remove: [handleTemplateDelete()],
  },
};
