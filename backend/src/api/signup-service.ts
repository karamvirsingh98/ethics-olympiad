import { Application } from "@feathersjs/express";

class SignupService {
  app: Application 
  invites: Array<{ email: string }> = []

  constructor(app: Application) {
    this.app = app
  }

  async create(data: { email: string }) {
    this.invites.push({email: data.email})
    //send the invitation email
  }

}

export default (app: Application) => {
  app.use("/api/signup-service", new SignupService(app))
}

