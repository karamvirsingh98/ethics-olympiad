import { Application } from "@feathersjs/express";

export class SignupService {
  app: Application 
  invites: string[] = []

  constructor(app: Application) {
    this.app = app
  }

  async create(data: { signupKey: string }) {
    this.invites.push(data.signupKey)
    // this.invites.push({email: data.email})
    // //send the invitation email
  }


  async authSignup(signupKey: string) {
    return this.invites.includes(signupKey)
  }
}

