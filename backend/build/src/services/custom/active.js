"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiveEventService = void 0;
const helpers_1 = require("../../helpers");
class ActiveEventService {
    constructor(app) {
        this.state = {};
        this.app = app;
        this.events = ['scored'];
    }
    get(eventID, { user, judgeName }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!user && judgeName)
                return {
                    scored: this.state[eventID].scores[judgeName],
                    teams: this.state[eventID].teams.filter((team) => team.present),
                };
            else
                return this.state[eventID];
        });
    }
    //sets or resets the event
    create({ eventID }) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = yield this.app.service("api/events").get(eventID);
            this.state[eventID] = {
                eventID,
                status: {},
                scores: {},
                teams: event.teams,
            };
            return this.state[eventID]; // event | null
        });
    }
    //uses put requests to update the stage for each judge
    update(eventID, { judgeName, status }) {
        return __awaiter(this, void 0, void 0, function* () {
            this.state[eventID].status[judgeName] = status;
            return this.state[eventID]; //event | null;
        });
    }
    //uses patch requests to update whether a team is present or absent
    patch(eventID, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.state[eventID].teams.findIndex(({ teamName }) => teamName === data.teamName);
            this.state[eventID].teams[index] = data;
            return this.state[eventID]; //event | null
        });
    }
    //removes an event from state
    remove(eventID) {
        return __awaiter(this, void 0, void 0, function* () {
            this.state = (0, helpers_1.filterOutFromObj)(this.state, [eventID]);
            return null;
        });
    }
    // clean() {
    //   const now = Math.floor(Date.now() / 1000);
    //   const filtered = this.invites.filter((invite) => invite.expiry! < now);
    //   if (filtered.length > 0) {
    //     console.log(
    //       `Cleared ${this.invites.length - filtered.length} stale invites.`
    //     );
    //     this.invites = filtered;
    //   }
    // }
    //internal method called by a hook to update the latest heat scored by a judge
    updateJudgeScore(eventID, judgeName, heatNumber) {
        this.state[eventID].scores[judgeName] = heatNumber;
        const t = this;
        t.emit("scored", this.state[eventID]);
    }
}
exports.ActiveEventService = ActiveEventService;
