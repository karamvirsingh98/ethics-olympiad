import { HookContext } from "@feathersjs/feathers";
import { authenticate } from "@feathersjs/authentication/lib/hooks";

const handleTemplateDelete = () => {
  return async (context: HookContext) => {
    console.log(context);
    return context;
  };
};

const TEMPLATE_HOOKS = {
  before: {
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")],
  },
  after: {
    delete: [handleTemplateDelete()],
  },
};
