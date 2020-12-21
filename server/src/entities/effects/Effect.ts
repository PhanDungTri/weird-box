import EFFECT_NAME from "../../../../shared/src/effectName";

abstract class Effect {
  protected power = -1;
  constructor(public readonly name: EFFECT_NAME) {}

  public setPower(power: number): void {
    this.power = power;
  }

  public getPower(): number {
    return this.power;
  }
}

export default Effect;
