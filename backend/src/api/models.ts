import mongoose from "mongoose";

export const EventModel = mongoose.model(
  "olympiad-event",
  new mongoose.Schema({
    owner: String,
    title: String,
    heats: [{ case1: String, case2: String }],
    teams: [{ name: String, present: Boolean }],
    timers: Array,
  })
);

export const CaseModel = mongoose.model(
  "olympiad-case",
  new mongoose.Schema({
    owner: String,
    title: String,
    isVideo: Boolean,
    videoURL: String,
    bodyText: String,
  })
);

export const UserModel = mongoose.model(
  "users",
  new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean,
  })
);
