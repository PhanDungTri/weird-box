import Client from "./Client";
import Game from "./Game";

class GameFinder {
  private queue: Client[] = [];
  private timeout: NodeJS.Timeout | undefined;

  public createNewGame(): Game {
    const clients: Client[] = [];
    let client = this.queue.shift();

    while (clients.length < 4 && client) {
      clients.push(client);
      client = this.queue.shift();
    }

    return new Game(undefined, ...clients);
  }

  public addClient(client: Client): void {
    if (this.timeout) clearTimeout(this.timeout);
    if (!this.queue.includes(client)) this.queue.push(client);
    if (this.queue.length === 1) return;
    if (this.queue.length >= 4) {
      this.createNewGame();
      return;
    }

    this.timeout = setTimeout(() => this.createNewGame(), 5000);
  }
}

export default GameFinder;
