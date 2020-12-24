import EFFECT_NAME from "../../../../shared/src/effectName";
import Player from "../Player";
import Effect from "./Effect";

abstract class OverTimeEffect extends Effect {
  constructor(name: EFFECT_NAME, protected target: Player, protected duration: number) {
    super(name);
  }

  public abstract tick(): void;
}

export default OverTimeEffect;
