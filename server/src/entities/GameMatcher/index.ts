import Client from "../Client";
import Server from "../Server";
import Lobby from "./Lobby";

class GameMatcher {
  private queue: Client[] = [];
  private waitingTimeout: NodeJS.Timeout | undefined;

  constructor(private server: Server) {}

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
    if (this.waitingTimeout) clearTimeout(this.waitingTimeout);
    if (this.queue.length === 1) return;
    if (this.queue.length >= 4) {
      this.createLobby();
      return;
    }

    this.waitingTimeout = setTimeout(this.createLobby.bind(this), 5000);
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

export default GameMatcher;
