import { Application } from "@feathersjs/feathers";
import { Service } from "feathers-mongoose";
import { CaseModel, EventModel, ScoreModel, UserModel } from "./services/core/models";
import { ActiveEventService } from "./services/custom/active";
import { ChannelService } from "./services/custom/channel";
import { InviteService } from "./services/custom/invite";
import { UnlockService } from "./services/custom/unlock";

export function coreServices(app: Application) {
  app.use("/api/users", new Service({ Model: UserModel, lean: true }));
  app.use("/api/events", new Service({ Model: EventModel, lean: true }));
  app.use("/api/cases", new Service({ Model: CaseModel, lean: true }));
  app.use("/api/scores", new Service({ Model: ScoreModel, lean: true }))
}

export function customServices(app: Application) {
  app.use("/api/invite", new InviteService(app));
  app.use("/api/unlock", new UnlockService(app));
  app.use("/api/active", new ActiveEventService(app));
  app.use("/api/channel", new ChannelService(app));
}
