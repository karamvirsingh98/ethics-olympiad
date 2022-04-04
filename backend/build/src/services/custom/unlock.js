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
exports.UnlockService = void 0;
const helpers_1 = require("../../helpers");
const errors_1 = require("@feathersjs/errors");
class UnlockService {
    constructor(app) {
        this.app = app;
    }
    create(data, { user }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, templateID, eventTitle, teams, password } = yield this.app.service("api/events").get({ _id: data.id });
            const { templateTitle, heats, timers } = yield this.app
                .service("api/templates")
                .get({ _id: templateID });
            const caseIDs = heats
                .map((heat) => [
                heat.case1 !== "" && heat.case1,
                heat.case2 !== "" && heat.case2,
            ])
                .flat();
            const cases = yield this.app
                .service("api/cases")
                .find({ query: { _id: { $in: caseIDs } } });
            if (data.password === password || user) {
                return {
                    event: { _id, eventTitle, templateTitle, heats, timers, teams },
                    cases: (0, helpers_1.arrToKeyedObject)(cases),
                };
            }
            else
                throw new errors_1.Forbidden("invalid password");
        });
    }
}
exports.UnlockService = UnlockService;
