import EFFECT_NAME from "../../../../shared/src/effectName";
import generateUniqueId from "../../utilities/generateUniqueId";

abstract class Effect {
  protected power = 0;
  public readonly id: string;

  constructor(public readonly name: EFFECT_NAME) {
    this.id = generateUniqueId();
  }

  public getPower(): number {
    return this.power;
  }
}

export default Effect;
