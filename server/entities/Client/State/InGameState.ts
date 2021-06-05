import ClientState from ".";
import Client from "..";
import { CLIENT_EVENT_NAME, EMOTION } from "../../../../shared/constants";
import Game from "../../Game";
import Player from "../../Player";

class InGameState extends ClientState {
  private canExpressEmotion = true;

  constructor(client: Client, protected player: Player, protected game: Game) {
    super(client);
    this.leaveGame = this.leaveGame.bind(this);
    this.expressEmotion = this.expressEmotion.bind(this);
  }

  private leaveGame(): void {
    this.game.removePlayer(this.player);
    this.game.eliminatePlayer(this.player);
  }

  private expressEmotion(emotion: EMOTION): void {
    if (this.canExpressEmotion) {
      setTimeout((() => (this.canExpressEmotion = true)).bind(this), 3000);
      this.canExpressEmotion = false;
      this.game.expressEmotion(this.player, emotion);
    }
  }

  public enter(): void {
    this.socket.on("disconnect", this.leaveGame);
    this.socket.on(CLIENT_EVENT_NAME.LeaveGame, this.leaveGame);
    this.socket.on(CLIENT_EVENT_NAME.ExpressEmotion, this.expressEmotion);
  }

  public exit(): void {
    this.socket.off("disconnect", this.leaveGame);
    this.socket.off(CLIENT_EVENT_NAME.LeaveGame, this.leaveGame);
    this.socket.off(CLIENT_EVENT_NAME.ExpressEmotion, this.expressEmotion);
  }
}

export default InGameState;
