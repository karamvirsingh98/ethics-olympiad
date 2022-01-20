import { LocalStrategy } from "@feathersjs/authentication-local/lib";
import { AuthenticationService, JWTStrategy } from "@feathersjs/authentication/lib";
import { Application } from "@feathersjs/express";

export default function (app: Application): void {
  const auth = new AuthenticationService(app);
  auth.register("jwt", new JWTStrategy());
  auth.register("local", new LocalStrategy());

  app.use("/authentication", auth);
}
