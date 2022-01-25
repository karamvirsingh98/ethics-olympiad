import { Application } from "@feathersjs/express";
import { Event } from "../../types";

export class UnlockService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async create(data: { id?: string; passkey?: string }) {
    const event: Event = this.app
      .service("api/events")
      .get({ _id: data.id });
    if (data.passkey === event.password) return "unlocked";
    else return "unlock failed";
  }
}
