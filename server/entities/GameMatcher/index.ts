import { Subject, timer } from "rxjs";
import { debounce, filter, map } from "rxjs/operators";
import Client from "../Client";
import Lobby from "./Lobby";

const WAIT_FOR_FULL_LOBBY = 5000;
const MAX_PLAYERS_PER_GAME = 4;

const limit = (value: number, limit: number): number => (value < limit ? value : limit);

class GameMatcher {
  private queue: Client[] = [];
  private queueWatcher = new Subject<Client[]>();

  constructor() {
    const queueFlow = this.queueWatcher.pipe(
      filter((q) => q.length > 1),
      debounce((q) => (q.length < 4 ? timer(WAIT_FOR_FULL_LOBBY) : timer(0))),
      map((q) => q.splice(limit(q.length, MAX_PLAYERS_PER_GAME)))
    );

    queueFlow.subscribe((clients) => {
      new Lobby(clients);
    });
  }

  public enqueue(client: Client): void {
    if (!this.queue.includes(client)) {
      this.queue.push(client);
      this.queueWatcher.next(this.queue);
    }
  }

  public dequeue(client: Client): void {
    if (this.queue.includes(client)) {
      this.queue = this.queue.filter((c) => c !== client);
      this.queueWatcher.next(this.queue);
    }
  }
}

export default GameMatcher;
