import { Application } from "@feathersjs/express";
import crypto from "crypto";

const MONTH_IN_MS = 2592000000;
const HOUR_IN_MS = 3600000;

export class InviteService {
  app: Application;
  invites: Array<{ name: string; key: string; expiry: number }> = [];

  constructor(app: Application) {
    this.app = app;
    setInterval(this.clean, HOUR_IN_MS);
  }

  async find() {
    return this.invites;
  }

  async create(data: { name: string }) {
    const key = crypto.randomBytes(16).toString("hex");
    const expiry = Date.now() + MONTH_IN_MS;
    this.invites.push({ name: data.name, key, expiry });
    return this.invites;
  }

  async remove(inviteKey: string) {
    this.clear(inviteKey);
    return this.invites;
  }

  async verify(inviteKey: string) {
    const verified = this.invites.some((invite) => invite.key === inviteKey);
    if (verified) this.clear(inviteKey);
    return verified;
  }

  clear(inviteKey: string) {
    this.invites = this.invites.filter((invite) => invite.key !== inviteKey);
  }

  clean() {
    const now = Date.now();
    const filtered = this.invites.filter((invite) => invite.expiry < now);
    if (filtered.length > 0) {
      console.log(
        `Cleared ${this.invites.length - filtered.length} stale invites.`
      );
      this.invites = filtered;
    }
  }
}
