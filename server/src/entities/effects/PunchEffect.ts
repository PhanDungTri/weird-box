import EFFECT_NAME from "../../../../shared/src/effectName";
import Game from "../Game";
import Player from "../Player";
import Effect from "./Effect";

class PunchEffect extends Effect {
  constructor(game: Game, source: Player) {
    super(EFFECT_NAME.Punch, game, source);
    this.power = this.game.getChargePoint();
  }

  public execute(): void {
    this.game.getPlayers().forEach((p) => {
      if (p !== this.source) {
        p.takeEffect(this);
        p.changeHitPoint(-this.power);
      }
    });
  }
}

export default PunchEffect;
