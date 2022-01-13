import { Application } from "@feathersjs/express";
import { Service } from "feathers-mongoose";
import { K } from "./api/k";
import { CaseModel, EventModel } from "./api/models";
import { SignupService } from "./api/signup-service";
import { UnlockOlympiadService } from "./api/unlock-olympiad-service";

export function coreServices(app: Application) {
  app.use("/api/events", new Service({ Model: EventModel }));
  app.use("/api/cases", new Service({ Model: CaseModel }))
}

export function customServices(app: Application) {
  app.use("/api/signup", new SignupService(app));
  app.use("/api/unlock", new UnlockOlympiadService(app));
  app.use("/api/k", new K());
}

