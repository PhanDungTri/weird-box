import Game from ".";
import Client from "../Client";
import ResponseChecker from "../ResponseChecker";

const WAIT_FOR_ALL_LOADED = 60000;

class GameReadyChecker extends ResponseChecker {
  constructor(clients: Client[], private game: Game) {
    super(clients, WAIT_FOR_ALL_LOADED);
  }

  protected onPass(): void {
    // TODO start game
  }
}

export default GameReadyChecker;
