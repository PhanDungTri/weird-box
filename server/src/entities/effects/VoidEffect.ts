import EFFECT_NAME from "../../../../shared/src/effectName";
import Game from "../Game";
import Player from "../Player";
import Effect from "./Effect";

class VoidEffect extends Effect {
  constructor(game: Game, source: Player) {
    super(EFFECT_NAME.Void, game, source);
    this.power = 0;
  }

  public execute(): void {
    return;
  }
}

export default VoidEffect;
