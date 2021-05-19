import Client from "../Client";
import Game from ".";
import ReadyChecker from "../ReadyChecker";
import Room from "../Room";

class GameLoadingChecker extends ReadyChecker {
  constructor(private game: Game, clients: Client[], room?: Room) {
    super(clients, room);
  }

  protected onQualify(): void {
    this.game.start(this.clients);
  }
}

export default GameLoadingChecker;
