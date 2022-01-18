import { model, Schema } from "mongoose";

export const EventModel = model(
  "olympiad-event",
  new Schema({
    owner: String,
    title: String,
    heats: [{ case1: String, case2: String }],
    teams: [{ name: String, present: Boolean }],
    timers: Array,
  })
);

export const CaseModel = model(
  "olympiad-case",
  new Schema({
    owner: String,
    title: String,
    isVideo: Boolean,
    videoURL: String,
    bodyText: String,
  })
);

export const UserModel = model(
  "users",
  new Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean,
  })
);
