import { SERVER_EVENT_NAME } from "../../../shared/constants";
import { MAX_PLAYERS_PER_GAME } from "../../../shared/config";
import Client from "../Client";
import MatchingChecker from "../ReadyChecker/MatchingChecker";

const WAIT_FOR_FULL_LOBBY = 5000;

class GameMatcher {
  private queue: Client[] = [];
  private timeout!: NodeJS.Timeout;

  private found() {
    const clients = this.queue.splice(
      0,
      this.queue.length < MAX_PLAYERS_PER_GAME ? this.queue.length : MAX_PLAYERS_PER_GAME
    );

    clients.forEach((c) => c.getSocket().emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "Found"));
    console.table(clients.map((c) => c.getId()));
    new MatchingChecker(clients);
  }

  private match() {
    clearTimeout(this.timeout);
    if (this.queue.length <= 1) return;
    if (this.queue.length >= 4) this.found();
    else this.timeout = setTimeout(this.found.bind(this), WAIT_FOR_FULL_LOBBY);
  }

  public add(client: Client): void {
    this.queue.push(client);
    client.getSocket().emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "Finding");
    this.match();
  }

  public remove(client: Client): void {
    this.queue = this.queue.filter((c) => c !== client);
    client.getSocket().emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "Canceled");
    this.match();
  }
}

export default GameMatcher;
