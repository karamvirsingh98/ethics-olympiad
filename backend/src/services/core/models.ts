import { Score, User } from "@ethics-olympiad/types";
import { model, Schema } from "mongoose";

export const TemplateModel = model(
  "olympiad-template",
  new Schema({
    owner: String,
    templateTitle: String,
    heats: [{ case1: String, case2: String }],
    timers: Array,
    level: String,
  })
);

export const EventModel = model(
  "olympiad-event",
  new Schema(
    {
      templateID: String,
      eventTitle: String,
      teams: [{ teamName: String, present: Boolean }],
      password: String,
    },
    { timestamps: true }
  )
);

export const CaseModel = model(
  "olympiad-case",
  new Schema(
    {
      owner: String,
      title: String,
      question: String,
      isVideo: Boolean,
      videoURL: String,
      bodyText: String,
      level: String,
      isOfficial: Boolean,
    },
    { timestamps: true }
  )
);

const TeamScore = {
  //presetnation as team A
  clarity: Number, // 0 - 5
  centrality: Number, //0 - 5
  thoughtfulness: Number, //0 - 5

  //responses as Team A
  response: Number, // 0 - 15
  judgeResponse: Number, //0 - 15

  //commentary as team B
  commentary: Number, //0 - 10

  //respectfulness score
  respectful: Number, //0 - 5
};

export const ScoreModel = model(
  "olympiad-score",
  new Schema<Score>(
    {
      eventID: String,
      judgeName: String,
      heatNumber: Number,
      teamA: String,
      teamB: String,
      honorableA: Boolean,
      honorableB: Boolean,
      scoreA: TeamScore,
      scoreB: TeamScore,
    },
    { timestamps: true }
  )
);

export const UserModel = model(
  "users",
  new Schema(
    {
      name: String,
      email: String,
      password: String,
      admin: Boolean,
      permissions: Array,
    },
    { timestamps: true }
  )
);
