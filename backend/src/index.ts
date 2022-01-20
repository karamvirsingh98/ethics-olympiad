import feathers from "@feathersjs/feathers";
import express from "@feathersjs/express";
import configuration from "@feathersjs/configuration";
import { coreServices, customServices } from "./services";
import mongoose from "mongoose";
import cors from "cors";
import authentication from "./services/core/authentication";
import hooks from "./services/hooks";

const app = express(feathers()).configure(configuration());

mongoose.connect(app.get("mongodb"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.configure(express.rest());
app.use(cors());

app.configure(authentication);
app.configure(coreServices);
app.configure(customServices);
app.configure(hooks);

app.use(express.errorHandler())

app.listen(3030).on("listening", () => {
  console.log("server on 3030");
});
