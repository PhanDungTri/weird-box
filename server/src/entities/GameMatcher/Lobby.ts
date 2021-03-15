import GameMatcher from ".";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import Client from "../Client";
import Game from "../Game";
import Server from "../Server";

class Lobby {
  private acceptance: Client[] = [];
  private confirmTimeout: NodeJS.Timeout | undefined;

  constructor(private clients: Client[], private server: Server, private matcher: GameMatcher) {
    clients.forEach((c) => {
      c.once(SOCKET_EVENT.AcceptGame, () => this.accept(c));
      c.once(SOCKET_EVENT.RejectGame, () => c.off(SOCKET_EVENT.AcceptGame));
    });
    clients.forEach((c) => c.send(SOCKET_EVENT.GameFound));
    this.confirmTimeout = setTimeout(this.cancel.bind(this), 30000);
  }

  private accept(client: Client) {
    client.off(SOCKET_EVENT.RejectGame);
    this.acceptance.push(client);

    if (this.clients.filter((c) => !this.acceptance.includes(c)).length === 0) {
      if (this.confirmTimeout) clearTimeout(this.confirmTimeout);
      this.server.addGame(new Game(this.server, undefined, ...this.clients));
      return;
    }
  }

  private cancel() {
    this.clients
      .filter((c) => this.acceptance.includes(c))
      .forEach((c) => {
        c.send(SOCKET_EVENT.GameCanceled, undefined);
        this.matcher.addClient(c);
      });

    this.clients = [];
    this.acceptance = [];
  }
}

export default Lobby;
