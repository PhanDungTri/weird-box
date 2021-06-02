import Client from "..";
import { SERVER_EVENT_NAME, CLIENT_EVENT_NAME } from "../../../../shared/constants";
import Game from "../../Game";
import Player from "../../Player";
import InGameState from "./InGameState";

class InTurnState extends InGameState {
  private playCard: (id: string) => void;

  constructor(client: Client, player: Player, game: Game) {
    super(client, player, game);
    this.playCard = this.player.playCard.bind(this.player);
  }

  public enter(): void {
    super.enter();

    this.socket.emit(SERVER_EVENT_NAME.Notify, "notiInTurn", "Info");
    this.socket.on(CLIENT_EVENT_NAME.PlayCard, this.playCard);
  }

  public exit(): void {
    super.exit();
    this.socket.off(CLIENT_EVENT_NAME.PlayCard, this.playCard);
  }
}

export default InTurnState;
