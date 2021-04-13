import Client from "../Client";
import Lobby from "./Lobby";

const WAIT_FOR_FULL_LOBBY = 5000;
const MAX_PLAYERS_PER_GAME = 4;

const limit = (value: number, limit: number): number => (value < limit ? value : limit);

class GameMatcher {
  private queue: Client[] = [];
  private timeout: NodeJS.Timeout | undefined;

  private newLobby() {
    new Lobby(this.queue.slice(-limit(this.queue.length, MAX_PLAYERS_PER_GAME)));
  }

  private match() {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.queue.length <= 1) return;
    else if (this.queue.length >= 4) this.newLobby();
    else this.timeout = setTimeout(this.newLobby.bind(this), WAIT_FOR_FULL_LOBBY);
  }

  public enqueue(client: Client): void {
    if (!this.queue.includes(client)) {
      this.queue.push(client);
      this.match();
    }
  }

  public dequeue(client: Client): void {
    if (this.queue.includes(client)) {
      this.queue = this.queue.filter((c) => c !== client);
      this.match();
    }
  }
}

export default GameMatcher;
