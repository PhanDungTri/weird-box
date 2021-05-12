import Client from ".";
import { CLIENT_EVENT_NAME } from "../../../shared/constants";
import Server from "../Server";
import ClientState from "./ClientState";

class FindingState extends ClientState {
  private onCancelFindGame: () => void;

  constructor(client: Client) {
    super(client);
    this.onCancelFindGame = this.cancelFindGame.bind(this);
  }

  private cancelFindGame() {
    Server.getInstance().dequeueClient(this.client);
  }

  public enter(): void {
    this.socket.on(CLIENT_EVENT_NAME.CancelFindGame, this.onCancelFindGame);
    this.socket.on("disconnect", this.onCancelFindGame);
  }

  public exit(): void {
    this.socket.off(CLIENT_EVENT_NAME.CancelFindGame, this.onCancelFindGame);
    this.socket.off("disconnect", this.onCancelFindGame);
  }
}

export default FindingState;
