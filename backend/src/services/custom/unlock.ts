import { Application } from "@feathersjs/feathers";
import { arrToKeyedObject } from "../../helpers";
import { Event, Template } from "@ethics-olympiad/types";
import { Forbidden } from "@feathersjs/errors";

export class UnlockService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async create(
    data: { id: string; password?: string },
    { user }: { user: any }
  ) {
    const { _id, templateID, eventTitle, teams, password }: Event =
      await this.app.service("api/events").get({ _id: data.id });
    const { templateTitle, heats, timers }: Template = await this.app
      .service("api/templates")
      .get({ _id: templateID });
    const caseIDs = heats
      .map((heat) => [
        heat.case1 !== "" && heat.case1,
        heat.case2 !== "" && heat.case2,
      ])
      .flat();
    const cases = await this.app
      .service("api/cases")
      .find({ query: { _id: { $in: caseIDs } } });
    if (data.password === password || user) {
      return {
        event: { _id, eventTitle, templateTitle, heats, timers, teams },
        cases: arrToKeyedObject(cases),
      };
    } else throw new Forbidden("invalid password");
  }
}
