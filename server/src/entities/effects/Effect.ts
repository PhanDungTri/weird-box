import EFFECT_NAME from "../../../../shared/src/effectName";

abstract class Effect {
  protected power = 0;

  constructor(public readonly name: EFFECT_NAME) {}

  public getPower(): number {
    return this.power;
  }
}

export default Effect;
