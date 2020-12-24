import EFFECT_NAME from "../../../../shared/src/effectName";
import Effect from "./Effect";

class HealEffect extends Effect {
  constructor(chargePoint: number) {
    super(EFFECT_NAME.Heal);
    this.power = chargePoint;
  }
}

export default HealEffect;
