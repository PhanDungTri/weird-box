import Client from "./Client";

class GameFinder {
  private queue: Client[] = [];

  public addClient(client: Client): void {
    this.queue.push(client);
  }
}

export default GameFinder;
