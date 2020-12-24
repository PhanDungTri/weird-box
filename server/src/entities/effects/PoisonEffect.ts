import EFFECT_NAME from "../../../../shared/src/effectName";
import Player from "../Player";
import OverTimeEffect from "./OverTimeEffect";

class PoisonEffect extends OverTimeEffect {
  constructor(chargePoint: number, target: Player) {
    super(EFFECT_NAME.Poison, target, 3);
    this.power = chargePoint;
  }

  public tick(): void {
    // TODO tell client that effect is triggered
    this.target.changeHitPoint(-this.power);
    this.duration--;

    if (this.duration <= 0) this.target.removeEffect(this);
  }
}

export default PoisonEffect;
