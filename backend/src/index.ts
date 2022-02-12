import feathers from "@feathersjs/feathers";
import configuration from "@feathersjs/configuration";
import primus from "@feathersjs/primus";
import mongoose from "mongoose";
import { coreServices, customServices } from "./services";
import hooks from "./services/hooks";
import authentication from "./services/core/authentication";
import client from "./client";

const app = feathers().configure(configuration());
app.configure(
  primus({ transformer: "websockets" }, (primus: any) => {
    primus.library();
    primus.save(__dirname + "/primus.js");
  })
);

mongoose.connect(app.get("mongodb"));

app.configure(authentication);
app.configure(coreServices);
app.configure(customServices);
app.configure(hooks);

app.listen(3030).on("listening", () => {
  console.log("server on port 3031");
  client();
});
