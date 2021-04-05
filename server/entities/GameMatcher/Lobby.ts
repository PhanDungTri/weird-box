import Client from "../Client";
import ResponseChecker from "../ResponseChecker";

class Lobby extends ResponseChecker {
  constructor(clients: Client[]) {
    super(clients);
    this.clients.forEach((c) => {
      c.once("reject game", () => c.removeAllListener("ready"));
      c.emit("update game matcher status", "found");
    });
  }

  protected onPass(): void {
    // TODO new game
  }

  protected ready(client: Client): void {
    client.removeAllListener("reject game");
    super.ready(client);
  }

  protected timeout(): void {
    this.clients.forEach((c) => {
      c.removeAllListener("reject game");
    });

    super.timeout();
  }
}

export default Lobby;
