import EFFECT_NAME from "../../../../shared/src/effectName";
import Game from "../Game";
import Player from "../Player";
import Effect from "./Effect";

class HealEffect extends Effect {
  constructor(game: Game, source: Player) {
    super(EFFECT_NAME.Heal, game, source);
    this.power = game.getChargePoint();
  }

  public execute(): void {
    this.source.changeHitPoint(this.power);
    this.source.sanitize();
    this.source.takeEffect(this);
  }
}

export default HealEffect;
