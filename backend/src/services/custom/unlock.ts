import { Application } from "@feathersjs/express";
import { Case, Event } from "../../types";

export class UnlockService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async create(data: { id: string; password: string }) {
    const { _id, title, heats, timers, teams, password }: Event = await this.app
      .service("api/events")
      .get({ _id: data.id });
    if (data.password === password) {
      const caseIDs = heats.map((heat) => [heat.case1, heat.case2]).flat();
      const cases: Case[] = await this.app.service("api/cases").find({
        query: {
          _id: { $in: [caseIDs] },
        },
      });
      return {
        event: { _id, title, heats, timers, teams },
        cases: arrToKeyedObject(cases),
      };
    }
  }
}

function arrToKeyedObject<T>(arr: T[], idField = "_id"): { [key: string]: T } {
  return Object.fromEntries(arr.map((obj: any) => [obj[idField], obj]));
}
