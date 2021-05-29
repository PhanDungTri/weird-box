import ClientState from ".";
import Client from "..";
import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import Server from "../../Server";

class FindingState extends ClientState {
  constructor(client: Client) {
    super(client);
    this.cancelFindGame = this.cancelFindGame.bind(this);
  }

  private cancelFindGame() {
    Server.getInstance().dequeueClient(this.client);
  }

  public enter(): void {
    this.socket.on(CLIENT_EVENT_NAME.CancelFindGame, this.cancelFindGame);
    this.socket.on("disconnect", this.cancelFindGame);
  }

  public exit(): void {
    this.socket.off(CLIENT_EVENT_NAME.CancelFindGame, this.cancelFindGame);
    this.socket.off("disconnect", this.cancelFindGame);
  }
}

export default FindingState;
