import { Application } from "@feathersjs/express";
import { Service } from "feathers-mongoose";
import { EventModel } from "./api/models";
import SignupService from "./api/signup-service";
import UnlockOlympiadService from "./api/unlock-olympiad-service";

export function coreServices(app: Application) {
  app.use("/api/events", new Service({ Model: EventModel }));
}

export function customServices(app: Application) {
  app.configure(SignupService)
  app.configure(UnlockOlympiadService)

}
