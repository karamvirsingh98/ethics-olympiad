import mongoose from "mongoose"

export const EventModel = mongoose.model("olympiad-event", new mongoose.Schema({
  owner: String,
  name: String,
  cases: Array,
  timers: Array
}))

export const CaseSchema = mongoose.model("olympiad-case", new mongoose.Schema({
  owner: String,
  isVideo: Boolean,
  videoURL: String,
  bodyText: String,
}))
