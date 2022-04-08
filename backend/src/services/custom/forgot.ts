import { User } from "@ethics-olympiad/types";
import { Application } from "@feathersjs/feathers";

export class ForgotPasswordService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async create({ email, password }: { email: string; password: string }) {
    const users = this.app.service("api/users");
    const user: User = await users.find({ query: { email } });
    console.log(user);
    await users.patch(user._id, { email, password });
    console.log(`user ${email} updated with ${password}`);
    return "password updated";
  }
}
