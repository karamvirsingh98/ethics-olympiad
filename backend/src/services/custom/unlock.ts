import { Application } from "@feathersjs/feathers";
import { arrToKeyedObject } from "../../helpers";
import { Event } from "../../types";

export class UnlockService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async create(data: { id: string; password?: string }, { user }:{ user: any } ) {
    const { _id, title, heats, timers, teams, password }: Event = await this.app
      .service("api/events")
      .get({ _id: data.id });
    const caseIDs = heats
      .map((heat) => [
        heat.case1 !== "" && heat.case1,
        heat.case2 !== "" && heat.case2,
      ])
      .flat();
    const cases = await this.app
      .service("api/cases")
      .find({ query: { _id: { $in: caseIDs } } });
    if (user || data.password === password) {
      return {
        event: { _id, title, heats, timers, teams },
        cases: arrToKeyedObject(cases),
      };
    }
  }
}
