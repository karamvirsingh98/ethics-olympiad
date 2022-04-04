import feathers from "@feathersjs/feathers";
import configuration from "@feathersjs/configuration";
import primus from "@feathersjs/primus";
import mongoose from "mongoose";
import { coreServices, customServices } from "./services";
import hooks from "./hooks";
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

app.listen(Number(process.env.PORT) || 3030).on("listening", async () => {
  console.log("websocket server on port 3030");
  if (process.env.NODE_ENV !== "production") await client();
  console.log("======================");
  console.log("====Setup Complete====");
  console.log("======================");

  app.on("connection", (c: any) => app.channel("general").join(c));

  app
    .service("api/active")
    .publish((data: any, { params }: any) =>
      app
        .channel(`events/${data.eventID}`)
        .filter((c: any) => c !== params.connection)
    );

  app
    .service("api/active")
    .publish("scored", (data: any) => app.channel(`events/${data.eventID}`));
});
