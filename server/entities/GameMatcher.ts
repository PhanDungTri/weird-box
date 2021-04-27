import { CONFIRM_WAIT_TIME, MAX_PLAYERS_PER_GAME, SERVER_EVENT_NAME } from "../../shared/constants";
import Client from "./Client";
import Lobby from "./Lobby";

const WAIT_FOR_FULL_LOBBY = 5000;

const limit = (value: number, limit: number): number => (value < limit ? value : limit);

class GameMatcher {
  private queue = new Set<Client>();
  private timeout: NodeJS.Timeout | undefined;

  private newLobby() {
    new Lobby(Array.from(this.queue).splice(-limit(this.queue.size, MAX_PLAYERS_PER_GAME)), CONFIRM_WAIT_TIME);
  }

  private match() {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.queue.size <= 1) return;
    else if (this.queue.size >= 4) this.newLobby();
    else this.timeout = setTimeout(this.newLobby.bind(this), WAIT_FOR_FULL_LOBBY);
  }

  public enqueue(client: Client): void {
    if (!this.queue.has(client)) {
      this.queue.add(client);
      client.getSocket().emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "finding");
      this.match();
    }
  }

  public dequeue(client: Client): void {
    if (this.queue.delete(client)) this.match();
  }
}

export default GameMatcher;
