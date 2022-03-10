import { Application, Params } from "@feathersjs/feathers";
import { filterOutFromObj } from "../../helpers";
import { ActiveEvents } from "../../types";
import { Event, Status } from "@ethics-olympiad/types";

export class ActiveEventService {
  app: Application;
  state: ActiveEvents = {};

  constructor(app: Application) {
    this.app = app;
  }

  async get(eventID: string, { user }: Params) {
    if (!user) return this.state[eventID].teams.filter(team => team.present)
    else return this.state[eventID];
  }

  //sets or resets the event
  async create({ eventID }: { eventID: string }) {
    const event: Event = await this.app.service("api/events").get(eventID);
    this.state[eventID] = { eventID, status: {}, scores: {}, teams: event.teams };
    return this.state[eventID]
  }

  //uses put requests to update the stage for each judge
  async update(
    eventID: string,
    { judgeName, status }: { judgeName: string; status: Status }
  ) {
    this.state[eventID].status[judgeName] = status;
    return this.state[eventID]; //event | null;
  }

  //uses patch requests to update the score status for each judge
  async patch(
    eventID: string,
    { judgeName, scored }: { judgeName: string; scored: boolean[] }
  ) {
    this.state[eventID].scores[judgeName].push(true)
    return this.state[eventID]; //event | null
  }

  //removes the event from the active list
  //TODO: maybe wrap in an outer setTimeout to clean old evts, or setup internal clean method
  async remove(eventID: string) {
    this.state = filterOutFromObj(this.state, [eventID])
    return null
  }

}

