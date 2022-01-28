import { authenticate } from "@feathersjs/authentication/lib/hooks";
import hashPassword from "@feathersjs/authentication-local/lib/hooks/hash-password";
import protect from "@feathersjs/authentication-local/lib/hooks/protect";
import { Application } from "@feathersjs/express";
import { HookContext } from "@feathersjs/feathers";
import { BadRequest, Forbidden } from "@feathersjs/errors";

export default function (app: Application) {
  app.service("api/users").hooks(USER_HOOKS);
  app.service("api/invite").hooks({ before: { all: [authenticate("jwt")] } });
  // app.service("api/events").hooks({ before: { get: [protectEvents()] } });
}

// const protectEvents = () => {
//   return async (context: HookContext) => {
//     if (!context.params.user) throw new Forbidden("No User")
//     return context
//     // context.data = context.data.map(({ _id, title }: Event) => ({ _id, title }))
//   };
// };

const verifyInvite = () => {
  return async (context: HookContext) => {
    const inviteKey = context.data.inviteKey;
    if (!inviteKey) throw new BadRequest("No invite key provided.");
    const verified = await context.app.service("api/invite").verify(inviteKey);
    if (!verified)
      throw new Forbidden("Invite not accepted, could not create user.");
    return context;
  };
};

const USER_HOOKS = {
  before: {
    all: [],
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [verifyInvite(), hashPassword("password")],
    update: [hashPassword("password"), authenticate("jwt")],
    patch: [hashPassword("password"), authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [protect("password")],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
