import { MAX_PLAYERS_PER_GAME, SERVER_EVENT_NAME } from "../../../shared/constants";
import Client from "../Client";
import MatchingChecker from "../ReadyChecker/MatchingChecker";

const WAIT_FOR_FULL_LOBBY = 5000;

class GameMatcher {
  private queue: Client[] = [];
  private timeout!: NodeJS.Timeout;

  private found() {
    console.log("found");
    const clients = this.queue.splice(
      -(this.queue.length < MAX_PLAYERS_PER_GAME ? this.queue.length : MAX_PLAYERS_PER_GAME)
    );

    clients.forEach((c) => c.getSocket().emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "found"));
    new MatchingChecker(clients);
  }

  private match() {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.queue.length <= 1) return;
    else if (this.queue.length >= 4) this.found();
    else this.timeout = setTimeout(this.found.bind(this), WAIT_FOR_FULL_LOBBY);
  }

  public add(client: Client): void {
    this.queue.push(client);
    client.getSocket().emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "finding");
    this.match();
  }

  public remove(client: Client): void {
    this.queue = this.queue.filter((c) => c !== client);
    this.match();
  }
}

export default GameMatcher;
