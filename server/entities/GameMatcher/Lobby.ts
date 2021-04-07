import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/@types";
import Client from "../Client";
import ResponseChecker from "../ResponseChecker";

class Lobby extends ResponseChecker {
  constructor(clients: Client[]) {
    super(clients);
    this.clients.forEach((c) => {
      c.once(CLIENT_EVENT_NAME.RejectGame, () => c.removeAllListener("ready"));
      c.emit(SERVER_EVENT_NAME.UpdateGameMatcherStatus, "found");
    });
  }

  protected onPass(): void {
    // TODO new game
  }

  protected ready(client: Client): void {
    client.removeAllListener("reject game");
    super.ready(client);
  }

  protected onTimeout(): void {
    this.clients.forEach((c) => {
      c.removeAllListener("reject game");
    });

    super.onTimeout();
  }
}

export default Lobby;
