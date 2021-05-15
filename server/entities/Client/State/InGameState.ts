import ClientState from ".";
import Client from "..";
import { CLIENT_EVENT_NAME } from "../../../../shared/constants";
import Game from "../../Game";
import Player from "../../Player";

class InGameState extends ClientState {
  private onLeaveGame: () => void;

  constructor(client: Client, protected player: Player, protected game: Game) {
    super(client);
    this.onLeaveGame = this.leaveGame.bind(this);
  }

  private leaveGame(): void {
    this.game.eliminatePlayer(this.player);
    this.game.removePlayer(this.player);
  }

  public enter(): void {
    this.socket.on("disconnect", this.onLeaveGame);
    this.socket.on(CLIENT_EVENT_NAME.LeaveGame, this.onLeaveGame);
  }

  public exit(): void {
    this.socket.off("disconnect", this.onLeaveGame);
    this.socket.off(CLIENT_EVENT_NAME.LeaveGame, this.onLeaveGame);
  }
}

export default InGameState;
