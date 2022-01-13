import { Application } from "@feathersjs/express";

export class K {
  message = " haboda skeepoda ";

  async find() {
    console.log("ping");
    return this.message;
  }

  async get() {
    console.log("ping");
    return this.message;
  }
}
