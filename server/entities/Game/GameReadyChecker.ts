import Game from ".";
import Client from "../Client";
import Qualifier from "../Qualifier";

const WAIT_FOR_ALL_LOADED = 60000;

class GameReadyChecker extends Qualifier {
  constructor(clients: Client[], private game: Game) {
    super(clients, WAIT_FOR_ALL_LOADED);
  }

  protected onQualified(): void {
    this.game.start();
  }
}

export default GameReadyChecker;
