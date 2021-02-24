import Client from "./Client";
import Game from "./Game";
import Server from "./Server";

class GameFinder {
  private queue: Client[] = [];
  private timeout: NodeJS.Timeout | undefined;

  constructor(private server: Server) {}

  public createNewGame(): Game {
    const clients: Client[] = [];
    let client = this.queue.shift();

    while (clients.length < 4 && client) {
      clients.push(client);
      client = this.queue.shift();
    }

    return new Game(this.server, undefined, ...clients);
  }

  private match(): void {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.queue.length === 1) return;
    if (this.queue.length >= 4) {
      this.server.addGame(this.createNewGame());
      return;
    }

    this.timeout = setTimeout(() => this.server.addGame(this.createNewGame()), 5000);
  }

  public removeClient(client: Client): void {
    this.queue = this.queue.filter((c) => c !== client);
    this.match();
  }

  public addClient(client: Client): void {
    if (!this.queue.includes(client)) this.queue.push(client);
    this.match();
  }
}

export default GameFinder;
