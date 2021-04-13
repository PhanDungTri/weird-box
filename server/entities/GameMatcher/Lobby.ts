import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/@types";
import Client from "../Client";
import Game from "../Game";
import ResponseChecker from "../ResponseChecker";

class Lobby extends ResponseChecker {
  constructor(clients: Client[]) {
    super(clients);
    this.clients.forEach((cl) => {
      const c = cl.getSocket();

      c.once(CLIENT_EVENT_NAME.RejectGame, () => c.removeAllListeners("ready"));
      c.emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "found");
    });
  }

  protected onPass(): void {
    new Game(this.clients);
  }

  protected ready(client: Client): void {
    client.getSocket().removeAllListeners("reject game");
    super.ready(client);
  }

  protected onTimeout(): void {
    this.clients.forEach((c) => {
      c.getSocket().removeAllListeners("reject game");
    });

    super.onTimeout();
  }
}

export default Lobby;
