import { Application } from "@feathersjs/express";
import { Event } from "../../types";

export class UnlockService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async create(data: { id: string; password: string }) {
    const { _id, title, heats, timers, teams, password }: Event = await this.app
      .service("api/events")
      .get({ _id: data.id });
    if (data.password === password) return { _id, title, heats, timers, teams };
  }
}
