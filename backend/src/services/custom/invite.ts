import { Application } from "@feathersjs/express";

export class InviteService {
  app: Application 
  invites: string[] = []

  constructor(app: Application) {
    this.app = app
  }

  async find() {
    return this.invites
  }

  async create(data: { inviteKey: string }) {
    this.invites.push(data.inviteKey)
    return this.invites
  }

  async remove(inviteKey: string) {
    this.invites = this.invites.filter((key) => key !== inviteKey);
    return this.invites
  }

  async verify(inviteKey: string) {
    const verified = this.invites.includes(inviteKey)
    if (verified) this.invites = this.invites.filter(key => key !== inviteKey)
    return verified
  }
}

