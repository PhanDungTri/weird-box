import EFFECT_NAME from "../../../../shared/src/effectName";
import Game from "../Game";
import Player from "../Player";
import Effect from "./Effect";

abstract class OverTimeEffect extends Effect {
  constructor(name: EFFECT_NAME, game: Game, source: Player, protected duration: number) {
    super(name, game, source);
  }
}

export default OverTimeEffect;
