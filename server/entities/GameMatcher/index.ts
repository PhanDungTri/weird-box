import Client from "../Client";
import Lobby from "./Lobby";

class GameMatcher {
  private queue: Client[] = [];
  private timeout: NodeJS.Timeout | undefined;

  private createLobby() {
    const clients: Client[] = [];
    let client = this.queue.shift();

    while (clients.length < 4 && client) {
      clients.push(client);
      client = this.queue.shift();
    }

    return new Lobby(clients, this.server, this);
  }

  private match(): void {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.queue.length === 1) return;
    if (this.queue.length >= 4) {
      this.createLobby();
      return;
    }

    this.timeout = setTimeout(this.createLobby.bind(this), 5000);
  }

  public enqueue(client: Client): void {
    if (!this.queue.includes(client)) {
      this.queue.push(client);
      this.match();
    }
  }

  public dequeue(client: Client): void {
    this.queue = this.queue.filter((c) => c !== client);
    this.match();
  }
}

export default GameMatcher;
