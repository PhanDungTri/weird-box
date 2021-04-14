import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/@types";
import Client from "../Client";
import Game from "../Game";
import Qualifier from "../Qualifier";

class Lobby extends Qualifier {
  constructor(clients: Client[], waitTime?: number) {
    super(clients, waitTime);
    this.clients.forEach((cl) => {
      cl.getSocket().once(CLIENT_EVENT_NAME.RejectGame, () => this.fail(cl));
      cl.getSocket().emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "found");
    });
  }

  protected onQualified(): void {
    new Game(this.clients);
  }

  protected ready(client: Client): void {
    client.getSocket().removeAllListeners(CLIENT_EVENT_NAME.RejectGame);
    super.ready(client);
  }

  protected fail(client: Client): void {
    client.getSocket().removeAllListeners(CLIENT_EVENT_NAME.Ready);
    super.fail(client);
  }

  protected onUnqualified(): void {
    this.clients.forEach((c) => {
      c.getSocket().removeAllListeners(CLIENT_EVENT_NAME.RejectGame);
    });

    super.onUnqualified();
  }
}

export default Lobby;
