import EFFECT_NAME from "../../../../shared/src/effectName";
import Effect from "./Effect";

class VoidEffect extends Effect {
  constructor() {
    super(EFFECT_NAME.Void);
    this.power = 0;
  }
}

export default VoidEffect;
