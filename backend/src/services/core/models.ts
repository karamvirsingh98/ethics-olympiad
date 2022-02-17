import { model, Schema } from "mongoose";

export const EventModel = model(
  "olympiad-event",
  new Schema({
    owner: String,
    title: String,
    heats: [{ case1: String, case2: String }],
    teams: [{ name: String, present: Boolean }],
    timers: Array,
    password: String,
  }, { timestamps: true })
);

export const CaseModel = model(
  "olympiad-case",
  new Schema({
    owner: String,
    title: String,
    question: String,
    isVideo: Boolean,
    videoURL: String,
    bodyText: String,
  })
);

const TeamScore = {
  judgeName: String,

  //pertains to presetnation as team A
  clarity: Number, // 0 - 5
  centrality: Number, //0 - 5
  thoughtfulness: Number, //0 - 5

  //pertains to responses as Team A
  response: Number, // 0 - 15
  judgeResponse: Number, //0 - 15

  //pertains to commentary as team B
  commentary: Number, //0 - 10

  //pertains to respectfulness score
  respectful: Number, //0 - 5
};

export const ScoreModel = model(
  "olympiad-score",
  new Schema({
    eventID: String,
    judgeName: String,
    heatNumber: Number,
    teamA: String,
    teamB: String,
    scoreA: TeamScore,
    scoreB: TeamScore,
    total: Number,
    submitted: Boolean
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
