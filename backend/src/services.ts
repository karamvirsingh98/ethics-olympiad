import { Application } from "@feathersjs/express";
import { Service } from "feathers-mongoose";
import { CaseModel, EventModel, UserModel } from "./services/core/models";
import { InviteService } from "./services/custom/invite";
import { UnlockService } from "./services/custom/unlock";

export function coreServices(app: Application) {
  app.use("/api/events", new Service({ Model: EventModel }));
  app.use("/api/cases", new Service({ Model: CaseModel }))
  app.use("/api/users", new Service({ Model: UserModel }))
}

export function customServices(app: Application) {
  app.use("/api/invite", new InviteService(app));
  app.use("/api/unlock", new UnlockService(app));
}

