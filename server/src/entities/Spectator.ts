import { IClient } from "../../../shared/src/interfaces/Client";
import Client from "./Client";
import Game from "./Game";

class Spectator {
  constructor(protected client: Client, protected game: Game) {}

  public getClient(): Client {
    return this.client;
  }

  public toJsonData(): IClient {
    return this.client.toJsonData();
  }
}

export default Spectator;
