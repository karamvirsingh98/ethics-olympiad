import { authenticate } from "@feathersjs/authentication/lib/hooks";
import hashPassword from "@feathersjs/authentication-local/lib/hooks/hash-password";
import protect from "@feathersjs/authentication-local/lib/hooks/protect";
import { Application } from "@feathersjs/feathers";
import { HookContext } from "@feathersjs/feathers";
import { BadRequest, Forbidden } from "@feathersjs/errors";
import { Event } from "@ethics-olympiad/types";

export default function (app: Application) {
  //core service hooks
  app.service("api/users").hooks(USER_HOOKS);
  app.service("api/events").hooks(EVENT_HOOKS);
  app.service("api/cases").hooks({ before: { all: [authenticate("jwt")] } });

  //custom service hooks
  app.service("api/invite").hooks({ before: { all: [authenticate("jwt")] } });
  app.service("api/scores").hooks(SCORE_HOOKS);
}

const protectEvents = () => {
  return async (context: HookContext) => {
    if (!context.params.user)
      await Promise.all(
        (context.result = context.result.map(
          async ({ _id, eventTitle, templateID }: Event) => ({
            _id,
            eventTitle,
            templateTitle: await context.app
              .service("api/template")
              .get({ _id: templateID }),
          })
        ))
      );
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

const updateJudgeScore = () => {
  return async (context: HookContext) => {
    const { eventID, judgeName, heatNumber } = context.data;
    context.app
      .service("/api/active")
      .updateJudgeScore(eventID, judgeName, heatNumber);
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

const SCORE_HOOKS = {
  before: {
    find: [authenticate("jwt")],
    get: [authenticate("jwt")],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")],
  },
  after: {
    create: [updateJudgeScore()],
  },
};
