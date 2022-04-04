"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.ScoreModel = exports.CaseModel = exports.EventModel = exports.TemplateModel = void 0;
const mongoose_1 = require("mongoose");
exports.TemplateModel = (0, mongoose_1.model)("olympiad-template", new mongoose_1.Schema({
    owner: String,
    templateTitle: String,
    heats: [{ case1: String, case2: String }],
    timers: Array,
    level: String,
}));
exports.EventModel = (0, mongoose_1.model)("olympiad-event", new mongoose_1.Schema({
    templateID: String,
    eventTitle: String,
    teams: [{ teamName: String, present: Boolean }],
    password: String,
}, { timestamps: true }));
exports.CaseModel = (0, mongoose_1.model)("olympiad-case", new mongoose_1.Schema({
    owner: String,
    title: String,
    question: String,
    isVideo: Boolean,
    videoURL: String,
    bodyText: String,
    level: String,
    isOfficial: Boolean,
}, { timestamps: true }));
const TeamScore = {
    //presetnation as team A
    clarity: Number,
    centrality: Number,
    thoughtfulness: Number,
    //responses as Team A
    response: Number,
    judgeResponse: Number,
    //commentary as team B
    commentary: Number,
    //respectfulness score
    respectful: Number, //0 - 5
};
exports.ScoreModel = (0, mongoose_1.model)("olympiad-score", new mongoose_1.Schema({
    eventID: String,
    judgeName: String,
    heatNumber: Number,
    teamA: String,
    teamB: String,
    scoreA: TeamScore,
    scoreB: TeamScore,
}, { timestamps: true }));
exports.UserModel = (0, mongoose_1.model)("users", new mongoose_1.Schema({
    name: String,
    email: String,
    password: String,
    admin: Boolean,
    permissions: Array,
}, { timestamps: true }));
