import { Application } from "@feathersjs/feathers";
import { ActiveEvents } from "../../types";

export class ActiveEventService {
  app: Application;
  state: ActiveEvents = {};

  constructor(app: Application) {
    this.app = app;
  }

  async get(eventID: string) {
    return this.state[eventID]
  }

  //sets or resets the event
  async create({ eventID }: { eventID: string }) {
    const event = await this.app.service("api/events").get(eventID);
    this.state[eventID] = { eventID, status: {}, scores: {} };
  }

  //uses put requests to update the stage for each judge
  async update(
    eventID: string,
    { judgeName, stage }: { judgeName: string; stage: number }
  ) {
    this.state[eventID] = {
      ...this.state[eventID],
      status: { ...this.state[eventID].status, [judgeName]: stage },
    };
    return this.state[eventID];
  }

  //uses patch requests to update the score status for each judge
  async patch(
    eventID: string,
    { judgeName, scored }: { judgeName: string; scored: boolean[] }
  ) {
    this.state[eventID] = {
      ...this.state[eventID],
      scores: { ...this.state[eventID].scores, [judgeName]: scored },
    };
    return this.state[eventID]
  }
}
