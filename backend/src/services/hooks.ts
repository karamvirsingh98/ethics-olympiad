import { authenticate } from "@feathersjs/authentication/lib/hooks";
import hashPassword from "@feathersjs/authentication-local/lib/hooks/hash-password";
import protect from "@feathersjs/authentication-local/lib/hooks/protect";
import { Application } from "@feathersjs/express";
import { HookContext } from "@feathersjs/feathers";

export default function (app: Application) {
  app.service("api/users").hooks(USER_HOOKS)
}

const verifyInvite = () => {
  return async (context: HookContext) => {
    const inviteKey = context.data.inviteKey;
    const verified = await context.app.service("signup").verify(inviteKey);
    if (!verified) throw new Error("not verified");
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

