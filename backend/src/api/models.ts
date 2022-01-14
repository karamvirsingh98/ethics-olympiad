import mongoose from "mongoose";

export const EventModel = mongoose.model(
  "olympiad-event",
  new mongoose.Schema({
    owner: String,
    title: String,
    cases: [{ case1: String, case2: String }],
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
