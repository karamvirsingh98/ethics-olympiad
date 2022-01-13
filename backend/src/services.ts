import { Application } from "@feathersjs/express";
import { Service } from "feathers-mongoose"
import { EventModel } from "./api/models";

export default function (app: Application) {
  app.use("/events", new Service({ Model: EventModel }))
}