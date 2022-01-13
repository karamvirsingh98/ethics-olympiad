import { Application } from "@feathersjs/express";
import { OlympiadEvent } from "../types";

class UnlockOlympiadService {
  app: Application

  constructor(app: Application) {
    this.app = app
  }

  async create(data: { id: string, passkey: string }) {
    const event: OlympiadEvent = this.app.service("api/events").get({ _id: data.id })
    if (data.passkey === event.passkey) return true
    else return false
  }
}

export default (app: Application) => {
  app.use("/api/", new UnlockOlympiadService(app))
}