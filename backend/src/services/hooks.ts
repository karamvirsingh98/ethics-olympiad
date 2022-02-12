import { authenticate } from "@feathersjs/authentication/lib/hooks";
import hashPassword from "@feathersjs/authentication-local/lib/hooks/hash-password";
import protect from "@feathersjs/authentication-local/lib/hooks/protect";
import { Application } from "@feathersjs/feathers";
import { HookContext } from "@feathersjs/feathers";
import { BadRequest, Forbidden } from "@feathersjs/errors";
import { Event } from "../types";

export default function (app: Application) {
  app.service("api/users").hooks(USER_HOOKS);
  app.service("api/events").hooks(EVENT_HOOKS);
  app.service("api/cases").hooks(CASE_HOOKS);

  //custom
  app.service("api/invite").hooks({ before: { all: [authenticate("jwt")] } });
}

const protectEvents = () => {
  return async (context: HookContext) => {
    if (context.params.headers && !context.params.headers.authorization)
      context.result = context.result.map(({ _id, title }: Event) => ({
        _id,
        title,
      }));
    return context;
  };
};

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
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    create: [verifyInvite(), hashPassword("password")],
    update: [hashPassword("password"), authenticate("jwt")],
    patch: [hashPassword("password"), authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [protect("password")],
  },
};

const EVENT_HOOKS = {
  before: {
    get: [authenticate("jwt")],
    create: [authenticate("jwt")],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    find: [protectEvents()],
  },
};

const CASE_HOOKS = {
  before: { all: [authenticate("jwt")] },
};
