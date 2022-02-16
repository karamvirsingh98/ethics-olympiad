import { Application } from "@feathersjs/feathers";
import { Score } from "../../types";

export class ScoresService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async get(eventID: string) { 
    return await this.app.service("api/scores").find({ eventID });
  }

  async create({
    eventID,
    teamName,
    newScore,
  }: {
    eventID: string;
    teamName: string;
    newScore: Score
  }) {
    const scores = await this.get(eventID);
    const updated = { ...scores, [teamName]: [...scores[teamName], newScore] };
    await this.app.service('api/scores').update(updated._id, updated)
    return updated
  }
}
