import { User } from "@ethics-olympiad/types";
import { Application } from "@feathersjs/feathers";

export class ForgotPasswordService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async create({ email, password }: { email: string; password: string }) {
    const users = this.app.service("api/users");
    const user: any = await users.find({ query: { email } });
    console.log(user._id());
    try {
      await users.patch(user._id, { email, password });
    } catch (e) {
      console.log(e);
    }
    console.log(`user ${email} updated with ${password}`);
    return "password updated";
  }
}
