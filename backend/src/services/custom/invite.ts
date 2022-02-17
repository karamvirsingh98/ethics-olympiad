import { Invite } from "@ethics-olympiad/types";
import { Application } from "@feathersjs/feathers";
import crypto from "crypto";

const MONTH_IN_SECS = 2592000;
const HOUR_IN_MS = 3600000;

export class InviteService {
  app: Application;
  invites: Invite[] = [];

  constructor(app: Application) {
    this.app = app;
    setInterval(() => this.clean(), HOUR_IN_MS);
  }

  async find() {
    return this.invites;
  }

  async create(data: { name: string; email: string }) {
    const key = crypto.randomBytes(16).toString("hex");
    const expiry = Math.floor(Date.now() / 1000) + MONTH_IN_SECS;
    this.invites.push({ ...data, key, expiry });
    return this.invites;
  }

  async remove(inviteKey: string) {
    this.clear(inviteKey);
    return this.invites;
  }

  async verify(inviteKey: string) {
    const verified = this.invites.some((invite) => invite.key === inviteKey);
    if (verified) {
      console.log(
        `${
          this.invites[this.invites.findIndex((i) => i.key === inviteKey)].name
        } Signed Up`
      );
      this.clear(inviteKey);
    }
    return verified;
  }

  clear(inviteKey: string) {
    this.invites = this.invites.filter((invite) => invite.key !== inviteKey);
  }

  clean() {
    const now = Math.floor(Date.now() / 1000);
    const filtered = this.invites.filter((invite) => invite.expiry! < now);
    if (filtered.length > 0) {
      console.log(
        `Cleared ${this.invites.length - filtered.length} stale invites.`
      );
      this.invites = filtered;
    }
  }
}
