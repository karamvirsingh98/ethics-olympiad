import { Application } from "@feathersjs/feathers";

export class ChannelService {
  app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  async create(
    { eventID }: { eventID: string },
    { connection }: { connection: any }
  ) {
    const channel = this.app.channel(`events/${eventID}`);
    if (connection && !channel.connections.includes(connection)) {
      channel.join(connection);
    }
    return `joined channel ${eventID}`;
  }

  async remove(eventID: string, { connection }: { connection: any }) {
    if (connection) {
      this.app.channel(`events/${eventID}`).leave(connection);
    }

    return `left channel ${eventID}`;
  }
}
