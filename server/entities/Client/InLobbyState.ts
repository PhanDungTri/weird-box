import Client from ".";
import { CLIENT_EVENT_NAME, SERVER_EVENT_NAME } from "../../../shared/constants";
import Lobby from "../Lobby";
import ClientState from "./ClientState";

class InLobbyState extends ClientState {
  private onFail: () => void;

  constructor(client: Client, protected lobby: Lobby) {
    super(client);
    this.onFail = this.lobby.fail.bind(this, this.client);
    this.socket.on(CLIENT_EVENT_NAME.RejectGame, this.onFail);
    this.socket.on("disconnect", this.onFail);

    const onReady = () => {
      this.ready(c);
      c.getSocket().off("disconnect", onFail);
    };

    const onFail = () => {
      this.fail(c);
      c.getSocket().off(CLIENT_EVENT_NAME.Ready, onReady);
    };

    c.getSocket().once(CLIENT_EVENT_NAME.Ready, onReady);
    c.getSocket().on("disconnect", onFail);
  }

  public enter(): void {
    this.socket.emit(SERVER_EVENT_NAME.UpdateGameMatchingStatus, "found");
  }

  public exit(): void {
    this.socket.off(CLIENT_EVENT_NAME.RejectGame, this.onFail);
    this.socket.off("disconnect", this.onFail);
  }
}
