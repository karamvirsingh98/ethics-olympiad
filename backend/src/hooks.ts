import { authenticate } from "@feathersjs/authentication/lib/hooks";
import { Application } from "@feathersjs/feathers";
import { EVENT_HOOKS } from "./services/hooks/events.hooks";
import { SCORE_HOOKS } from "./services/hooks/scores.hooks";
import { TEMPLATE_HOOKS } from "./services/hooks/template.hooks";
import { USER_HOOKS } from "./services/hooks/uesrs.hooks";

export default function (app: Application) {
  //core service hooks
  app.service("api/users").hooks(USER_HOOKS);
  app.service("api/events").hooks(EVENT_HOOKS);
  app.service("api/cases").hooks({ before: { all: [authenticate("jwt")] } });
  app.service("api/templates").hooks(TEMPLATE_HOOKS);

  //custom service hooks
  app.service("api/invite").hooks({ before: { all: [authenticate("jwt")] } });
  app.service("api/scores").hooks(SCORE_HOOKS);
}
