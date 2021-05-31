import ClientState from ".";
import Client from "..";
import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import Game from "../../Game";
import Player from "../../Player";

class InGameState extends ClientState {
  constructor(client: Client, protected player: Player, protected game: Game) {
    super(client);
    this.leaveGame = this.leaveGame.bind(this);
  }

  private leaveGame(): void {
    this.game.removePlayer(this.player);
    this.game.eliminatePlayer(this.player);
  }

  public enter(): void {
    this.socket.on("disconnect", this.leaveGame);
    this.socket.on(CLIENT_EVENT_NAME.LeaveGame, this.leaveGame);
  }

  public exit(): void {
    this.socket.off("disconnect", this.leaveGame);
    this.socket.off(CLIENT_EVENT_NAME.LeaveGame, this.leaveGame);
  }
}

export default InGameState;
