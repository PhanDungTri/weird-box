import Game from ".";
import Client from "../Client";
import ReadyChecker from "../ReadyChecker";

const WAIT_FOR_ALL_LOADED = 60000;

class GameReadyChecker extends ReadyChecker {
  constructor(clients: Client[], private game: Game, room = false) {
    super(clients, WAIT_FOR_ALL_LOADED, room);
  }

  protected onQualified(): void {
    this.game.start();
  }
}

export default GameReadyChecker;
