import Client from "./Client";
import Game from "./Game";

class GameFinder {
  private queue: Client[] = [];

  public addClient(client: Client): void {
    this.queue.push(client);

    if (this.queue.length >= 3) {
      const clients: Client[] = [];
      for (let i = 0; i < 3; i++) {
        clients.push(this.queue.shift() as Client);
      }
      new Game(undefined, ...clients);
    }
  }
}

export default GameFinder;
