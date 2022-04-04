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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_HOOKS = void 0;
const hooks_1 = require("@feathersjs/authentication/lib/hooks");
const hash_password_1 = __importDefault(require("@feathersjs/authentication-local/lib/hooks/hash-password"));
const protect_1 = __importDefault(require("@feathersjs/authentication-local/lib/hooks/protect"));
const errors_1 = require("@feathersjs/errors");
const verifyInvite = () => {
    return (context) => __awaiter(void 0, void 0, void 0, function* () {
        const inviteKey = context.data.inviteKey;
        if (!inviteKey)
            throw new errors_1.BadRequest("No invite key provided.");
        const verified = yield context.app.service("api/invite").verify(inviteKey);
        if (!verified)
            throw new errors_1.Forbidden("Invite not accepted, could not create user.");
        return context;
    });
};
exports.USER_HOOKS = {
    before: {
        find: [(0, hooks_1.authenticate)("jwt")],
        get: [(0, hooks_1.authenticate)("jwt")],
        create: [verifyInvite(), (0, hash_password_1.default)("password")],
        update: [(0, hash_password_1.default)("password"), (0, hooks_1.authenticate)("jwt")],
        patch: [(0, hash_password_1.default)("password"), (0, hooks_1.authenticate)("jwt")],
        remove: [(0, hooks_1.authenticate)("jwt")],
    },
    after: {
        all: [(0, protect_1.default)("password")],
    },
};
