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
exports.InviteService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const MONTH_IN_SECS = 2592000;
const HOUR_IN_MS = 3600000;
class InviteService {
    constructor(app) {
        this.invites = [];
        this.app = app;
        setInterval(() => this.clean(), HOUR_IN_MS);
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.invites;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const key = crypto_1.default.randomBytes(16).toString("hex");
            const expiry = Math.floor(Date.now() / 1000) + MONTH_IN_SECS;
            this.invites.push(Object.assign(Object.assign({}, data), { key, expiry }));
            return this.invites;
        });
    }
    remove(inviteKey) {
        return __awaiter(this, void 0, void 0, function* () {
            this.clear(inviteKey);
            return this.invites;
        });
    }
    verify(inviteKey) {
        return __awaiter(this, void 0, void 0, function* () {
            const verified = this.invites.some((invite) => invite.key === inviteKey);
            if (verified) {
                console.log(`${this.invites[this.invites.findIndex((i) => i.key === inviteKey)].name} Has Created an Account`);
                this.clear(inviteKey);
            }
            return verified;
        });
    }
    clear(inviteKey) {
        this.invites = this.invites.filter((invite) => invite.key !== inviteKey);
    }
    clean() {
        const now = Math.floor(Date.now() / 1000);
        const filtered = this.invites.filter((invite) => invite.expiry < now);
        if (filtered.length > 0) {
            console.log(`Cleared ${this.invites.length - filtered.length} stale invites.`);
            this.invites = filtered;
        }
    }
}
exports.InviteService = InviteService;
