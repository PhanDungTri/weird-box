import EFFECT_NAME from "../../../../shared/src/effectName";
import Effect from "./Effect";

class PunchEffect extends Effect {
  constructor(chargePoint: number) {
    super(EFFECT_NAME.Punch);
    this.power = chargePoint;
  }
}

export default PunchEffect;
