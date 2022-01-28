import { Application } from "@feathersjs/express";
import { Event } from "../../types";

export class UnlockService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async create(data: { id?: string; password?: string }) {
    const event: Event = this.app
      .service("api/events")
      .get({ _id: data.id });
    delete event.password
    if (data.password === event.password) return event;
  }
}
