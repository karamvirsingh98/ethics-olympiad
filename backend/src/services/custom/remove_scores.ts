import { Score } from "@ethics-olympiad/types";
import { Application } from "@feathersjs/feathers";

export class RemoveScoresService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async create({ eventID }: { eventID: string }) {
    const eventScores = await this.app
      .service("api/scores")
      .find({ query: { eventID } });
    await Promise.all(
      eventScores.map((score: Score) =>
        this.app.service("api/scores").remove(score._id)
      )
    );
    return true;
  }
}
