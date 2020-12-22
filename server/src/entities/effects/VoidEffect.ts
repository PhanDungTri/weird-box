import EFFECT_NAME from "../../../../shared/src/effectName";
import Game from "../Game";
import Effect from "./Effect";

class VoidEffect extends Effect {
  constructor(game: Game) {
    super(EFFECT_NAME.Void, game);
    this.power = 0;
  }

  public execute(): void {
    return;
  }
}

export default VoidEffect;
