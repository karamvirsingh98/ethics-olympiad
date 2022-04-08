import { authenticate } from "@feathersjs/authentication/lib/hooks";
import hashPassword from "@feathersjs/authentication-local/lib/hooks/hash-password";
import protect from "@feathersjs/authentication-local/lib/hooks/protect";
import { HookContext } from "@feathersjs/feathers";
import { BadRequest, Forbidden } from "@feathersjs/errors";

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

export const USER_HOOKS = {
  before: {
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [verifyInvite(), hashPassword("password")],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [protect("password")],
  },
};
