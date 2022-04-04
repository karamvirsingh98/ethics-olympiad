'use strict';

var feathers = require('@feathersjs/feathers');
var configuration = require('@feathersjs/configuration');
var primus = require('@feathersjs/primus');
var mongoose = require('mongoose');
var feathersMongoose = require('feathers-mongoose');
var crypto = require('crypto');
var errors = require('@feathersjs/errors');
var hooks$1 = require('@feathersjs/authentication/lib/hooks');
var hashPassword = require('@feathersjs/authentication-local/lib/hooks/hash-password');
var protect = require('@feathersjs/authentication-local/lib/hooks/protect');
var lib$1 = require('@feathersjs/authentication-local/lib');
var lib = require('@feathersjs/authentication/lib');
var fs = require('fs');
var http = require('http');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var feathers__default = /*#__PURE__*/_interopDefaultLegacy(feathers);
var configuration__default = /*#__PURE__*/_interopDefaultLegacy(configuration);
var primus__default = /*#__PURE__*/_interopDefaultLegacy(primus);
var mongoose__default = /*#__PURE__*/_interopDefaultLegacy(mongoose);
var crypto__default = /*#__PURE__*/_interopDefaultLegacy(crypto);
var hashPassword__default = /*#__PURE__*/_interopDefaultLegacy(hashPassword);
var protect__default = /*#__PURE__*/_interopDefaultLegacy(protect);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var http__default = /*#__PURE__*/_interopDefaultLegacy(http);

const TemplateModel = mongoose.model("olympiad-template", new mongoose.Schema({
  owner: String,
  templateTitle: String,
  heats: [{ case1: String, case2: String }],
  timers: Array,
  level: String
}));
const EventModel = mongoose.model("olympiad-event", new mongoose.Schema({
  templateID: String,
  eventTitle: String,
  teams: [{ teamName: String, present: Boolean }],
  password: String
}, { timestamps: true }));
const CaseModel = mongoose.model("olympiad-case", new mongoose.Schema({
  owner: String,
  title: String,
  question: String,
  isVideo: Boolean,
  videoURL: String,
  bodyText: String,
  level: String,
  isOfficial: Boolean
}, { timestamps: true }));
const TeamScore = {
  clarity: Number,
  centrality: Number,
  thoughtfulness: Number,
  response: Number,
  judgeResponse: Number,
  commentary: Number,
  respectful: Number
};
const ScoreModel = mongoose.model("olympiad-score", new mongoose.Schema({
  eventID: String,
  judgeName: String,
  heatNumber: Number,
  teamA: String,
  teamB: String,
  scoreA: TeamScore,
  scoreB: TeamScore
}, { timestamps: true }));
const UserModel = mongoose.model("users", new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  admin: Boolean,
  permissions: Array
}, { timestamps: true }));

function filterOutFromObj(obj, idsToFilterOut) {
  return Object.fromEntries(Object.entries(obj).filter((entry) => {
    return !stringIn(entry[0], idsToFilterOut);
  }));
}
function stringIn(str, ar) {
  return ar.includes(str);
}
function arrToKeyedObject(arr, idField = "_id") {
  return Object.fromEntries(arr.map((obj) => [obj[idField], obj]));
}

class ActiveEventService {
  constructor(app) {
    this.state = {};
    this.app = app;
    this.events = ["scored"];
  }
  async get(eventID, { user, judgeName }) {
    if (!user && judgeName)
      return {
        scored: this.state[eventID].scores[judgeName],
        teams: this.state[eventID].teams.filter((team) => team.present)
      };
    else
      return this.state[eventID];
  }
  async create({ eventID }) {
    const event = await this.app.service("api/events").get(eventID);
    this.state[eventID] = {
      eventID,
      status: {},
      scores: {},
      teams: event.teams
    };
    return this.state[eventID];
  }
  async update(eventID, { judgeName, status }) {
    this.state[eventID].status[judgeName] = status;
    return this.state[eventID];
  }
  async patch(eventID, data) {
    const index = this.state[eventID].teams.findIndex(({ teamName }) => teamName === data.teamName);
    this.state[eventID].teams[index] = data;
    return this.state[eventID];
  }
  async remove(eventID) {
    this.state = filterOutFromObj(this.state, [eventID]);
    return null;
  }
  updateJudgeScore(eventID, judgeName, heatNumber) {
    this.state[eventID].scores[judgeName] = heatNumber;
    const t = this;
    t.emit("scored", this.state[eventID]);
  }
}

class ChannelService {
  constructor(app) {
    this.app = app;
  }
  async create({ eventID }, { connection }) {
    const channel = this.app.channel(`events/${eventID}`);
    if (connection && !channel.connections.includes(connection)) {
      channel.join(connection);
    }
    return `joined channel ${eventID}`;
  }
  async remove(eventID, { connection }) {
    if (connection) {
      this.app.channel(`events/${eventID}`).leave(connection);
    }
    return `left channel ${eventID}`;
  }
}

const MONTH_IN_SECS = 2592e3;
const HOUR_IN_MS = 36e5;
class InviteService {
  constructor(app) {
    this.invites = [];
    this.app = app;
    setInterval(() => this.clean(), HOUR_IN_MS);
  }
  async find() {
    return this.invites;
  }
  async create(data) {
    const key = crypto__default["default"].randomBytes(16).toString("hex");
    const expiry = Math.floor(Date.now() / 1e3) + MONTH_IN_SECS;
    this.invites.push({ ...data, key, expiry });
    return this.invites;
  }
  async remove(inviteKey) {
    this.clear(inviteKey);
    return this.invites;
  }
  async verify(inviteKey) {
    const verified = this.invites.some((invite) => invite.key === inviteKey);
    if (verified) {
      console.log(`${this.invites[this.invites.findIndex((i) => i.key === inviteKey)].name} Has Created an Account`);
      this.clear(inviteKey);
    }
    return verified;
  }
  clear(inviteKey) {
    this.invites = this.invites.filter((invite) => invite.key !== inviteKey);
  }
  clean() {
    const now = Math.floor(Date.now() / 1e3);
    const filtered = this.invites.filter((invite) => invite.expiry < now);
    if (filtered.length > 0) {
      console.log(`Cleared ${this.invites.length - filtered.length} stale invites.`);
      this.invites = filtered;
    }
  }
}

class UnlockService {
  constructor(app) {
    this.app = app;
  }
  async create(data, { user }) {
    const { _id, templateID, eventTitle, teams, password } = await this.app.service("api/events").get({ _id: data.id });
    const { templateTitle, heats, timers } = await this.app.service("api/templates").get({ _id: templateID });
    const caseIDs = heats.map((heat) => [
      heat.case1 !== "" && heat.case1,
      heat.case2 !== "" && heat.case2
    ]).flat();
    const cases = await this.app.service("api/cases").find({ query: { _id: { $in: caseIDs } } });
    if (data.password === password || user) {
      return {
        event: { _id, eventTitle, templateTitle, heats, timers, teams },
        cases: arrToKeyedObject(cases)
      };
    } else
      throw new errors.Forbidden("invalid password");
  }
}

function coreServices(app) {
  app.use("/api/users", new feathersMongoose.Service({ Model: UserModel, lean: true }));
  app.use("/api/events", new feathersMongoose.Service({ Model: EventModel, lean: true }));
  app.use("/api/cases", new feathersMongoose.Service({ Model: CaseModel, lean: true }));
  app.use("/api/scores", new feathersMongoose.Service({ Model: ScoreModel, lean: true }));
  app.use("/api/templates", new feathersMongoose.Service({ Model: TemplateModel, lean: true }));
}
function customServices(app) {
  app.use("/api/invite", new InviteService(app));
  app.use("/api/unlock", new UnlockService(app));
  app.use("/api/active", new ActiveEventService(app));
  app.use("/api/channel", new ChannelService(app));
}

const protectEvents = () => {
  return async (context) => {
    if (!context.params.user)
      context.result = context.result.map(({ _id, eventTitle, templateID }) => ({
        _id,
        eventTitle,
        templateID
      }));
    return context;
  };
};
const EVENT_HOOKS = {
  before: {
    get: [hooks$1.authenticate("jwt")],
    create: [hooks$1.authenticate("jwt")],
    update: [hooks$1.authenticate("jwt")],
    patch: [hooks$1.authenticate("jwt")],
    remove: [hooks$1.authenticate("jwt")]
  },
  after: {
    find: [protectEvents()]
  }
};

const updateJudgeScore = () => {
  return async (context) => {
    const { eventID, judgeName, heatNumber } = context.data;
    context.app.service("/api/active").updateJudgeScore(eventID, judgeName, heatNumber);
    return context;
  };
};
const SCORE_HOOKS = {
  before: {
    get: [hooks$1.authenticate("jwt")],
    update: [hooks$1.authenticate("jwt")],
    patch: [hooks$1.authenticate("jwt")],
    remove: [hooks$1.authenticate("jwt")]
  },
  after: {
    create: [updateJudgeScore()]
  }
};

const handleTemplateDelete = () => {
  return async (context) => {
    const id = context.id;
    const eventsToRemove = await context.app.service("api/events").find({ query: { templateID: id } });
    await Promise.all(eventsToRemove.map((event) => context.app.service("api/events").remove(event._id)));
    return context;
  };
};
const TEMPLATE_HOOKS = {
  before: {
    find: [hooks$1.authenticate("jwt")],
    get: [hooks$1.authenticate("jwt")],
    update: [hooks$1.authenticate("jwt")],
    patch: [hooks$1.authenticate("jwt")],
    remove: [hooks$1.authenticate("jwt")]
  },
  after: {
    remove: [handleTemplateDelete()]
  }
};

const verifyInvite = () => {
  return async (context) => {
    const inviteKey = context.data.inviteKey;
    if (!inviteKey)
      throw new errors.BadRequest("No invite key provided.");
    const verified = await context.app.service("api/invite").verify(inviteKey);
    if (!verified)
      throw new errors.Forbidden("Invite not accepted, could not create user.");
    return context;
  };
};
const USER_HOOKS = {
  before: {
    find: [hooks$1.authenticate("jwt")],
    get: [hooks$1.authenticate("jwt")],
    create: [verifyInvite(), hashPassword__default["default"]("password")],
    update: [hashPassword__default["default"]("password"), hooks$1.authenticate("jwt")],
    patch: [hashPassword__default["default"]("password"), hooks$1.authenticate("jwt")],
    remove: [hooks$1.authenticate("jwt")]
  },
  after: {
    all: [protect__default["default"]("password")]
  }
};

function hooks(app) {
  app.service("api/users").hooks(USER_HOOKS);
  app.service("api/events").hooks(EVENT_HOOKS);
  app.service("api/cases").hooks({ before: { all: [hooks$1.authenticate("jwt")] } });
  app.service("api/templates").hooks(TEMPLATE_HOOKS);
  app.service("api/scores").hooks(SCORE_HOOKS);
  app.service("api/invite").hooks({ before: { all: [hooks$1.authenticate("jwt")] } });
}

function authentication(app) {
  const auth = new lib.AuthenticationService(app);
  auth.register("jwt", new lib.JWTStrategy());
  auth.register("local", new lib$1.LocalStrategy());
  app.use("/authentication", auth);
}

var client = async () => http__default["default"].createServer(function(req, res) {
  fs__default["default"].readFile(__dirname + "/primus.js", function(err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(3031).on("listening", () => console.log("client hosted on port 3031"));

const app = feathers__default["default"]().configure(configuration__default["default"]());
app.configure(primus__default["default"]({ transformer: "websockets" }, (primus2) => {
  primus2.library();
  primus2.save(__dirname + "/primus.js");
}));
mongoose__default["default"].connect(app.get("mongodb"));
app.configure(authentication);
app.configure(coreServices);
app.configure(customServices);
app.configure(hooks);
app.listen(Number(process.env.PORT) || 3030).on("listening", async () => {
  console.log("websocket server on port 3030");
  if (process.env.NODE_ENV !== "production")
    await client();
  console.log("======================");
  console.log("====Setup Complete====");
  console.log("======================");
  app.on("connection", (c) => app.channel("general").join(c));
  app.service("api/active").publish((data, { params }) => app.channel(`events/${data.eventID}`).filter((c) => c !== params.connection));
  app.service("api/active").publish("scored", (data) => app.channel(`events/${data.eventID}`));
});
