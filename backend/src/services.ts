import { Application } from "@feathersjs/express";
import { Service } from "feathers-mongoose";
import { CaseModel, EventModel, UserModel } from "./services/core/database-models";
import { SignupService } from "./services/custom/invite-service";
import { UnlockOlympiadService } from "./services/custom/unlock-service";

export function coreServices(app: Application) {
  app.use("/api/events", new Service({ Model: EventModel }));
  app.use("/api/cases", new Service({ Model: CaseModel }))
  app.use("/api/users", new Service({ Model: UserModel }))
}

export function customServices(app: Application) {
  app.use("/api/signup", new SignupService(app));
  app.use("/api/unlock", new UnlockOlympiadService(app));
}

