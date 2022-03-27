import { Application, Params } from "@feathersjs/feathers";
import { filterOutFromObj } from "../../helpers";
import { ActiveEvents } from "../../types";
import { Event, Status, Team } from "@ethics-olympiad/types";

export class ActiveEventService {
  app: Application;
  state: ActiveEvents = {};

  constructor(app: Application) {
    this.app = app;
  }

  async get(eventID: string, { user, judgeName }: Params) {
    if (!user && judgeName)
      return {
        scored: this.state[eventID].scores[judgeName],
        teams: this.state[eventID].teams.filter((team) => team.present),
      };
    else return this.state[eventID];
  }

  //sets or resets the event
  async create({ eventID }: { eventID: string }) {
    const event: Event = await this.app.service("api/events").get(eventID);
    this.state[eventID] = {
      eventID,
      status: {},
      scores: {},
      teams: event.teams,
    };
    return this.state[eventID]; // event | null
  }

  //uses put requests to update the stage for each judge
  async update(
    eventID: string,
    { judgeName, status }: { judgeName: string; status: Status }
  ) {
    this.state[eventID].status[judgeName] = status;
    return this.state[eventID]; //event | null;
  }

  //uses patch requests to update whether a team is present or absent
  async patch(eventID: string, data: Team) {
    const index = this.state[eventID].teams.findIndex(
      ({ teamName }) => teamName === data.teamName
    );
    this.state[eventID].teams[index] = data;
    return this.state[eventID]; //event | null
  }

  //removes an event from state
  async remove(eventID: string) {
    this.state = filterOutFromObj(this.state, [eventID]);
    return null;
  }

  // clean() {
  //   const now = Math.floor(Date.now() / 1000);
  //   const filtered = this.invites.filter((invite) => invite.expiry! < now);
  //   if (filtered.length > 0) {
  //     console.log(
  //       `Cleared ${this.invites.length - filtered.length} stale invites.`
  //     );
  //     this.invites = filtered;
  //   }
  // }

  //internal method called by a hook to update the latest heat scored by a judge
  updateJudgeScore(eventID: string, judgeName: string, heatNumber: number) {
    this.state[eventID].scores[judgeName] = heatNumber;
    const t: any = this;
    t.emit("scored", { type: "scored", data: this.state[eventID] });
  }
}
