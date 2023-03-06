import { Application } from "@feathersjs/feathers";
import { arrToKeyedObject } from "../../helpers";
import {
  Case,
  CustomQuestion,
  Event,
  Template,
  User,
} from "@ethics-olympiad/types";
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
    const { templateTitle, heats, timers, owner }: Template = await this.app
      .service("api/templates")
      .get({ _id: templateID });
    const caseIDs = heats
      .map((heat) => [
        heat.case1 !== "" && heat.case1,
        heat.case2 !== "" && heat.case2,
      ])
      .flat();
    let cases = await this.app
      .service("api/cases")
      .find({ query: { _id: { $in: caseIDs } } });
    const isOfficial = await this.isOfficialEvent(owner);
    if (isOfficial) {
      const customQuestions = await this.app
        .service("api/questions")
        .find({ query: { caseID: { $in: caseIDs }, userID: owner } });
      cases = this.asembleCasesForUnoffficialEvent(cases, customQuestions);
    }
    if (data.password === password || user) {
      return {
        event: { _id, eventTitle, templateTitle, heats, timers, teams },
        cases: arrToKeyedObject(cases),
      };
    } else throw new Forbidden("invalid password");
  }

  async isOfficialEvent(userID: string) {
    const user: User = await this.app.service("api/users").get(userID);
    return user.admin ? true : false;
  }

  asembleCasesForUnoffficialEvent(
    cases: Case[],
    customQuestions: CustomQuestion[]
  ) {
    const cQs = arrToKeyedObject(customQuestions, "caseID");
    return cases.map((c) => ({
      ...c,
      question: cQs[c._id!].question || "no question set",
    }));
  }
}
