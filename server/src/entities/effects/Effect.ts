import EFFECT_NAME from "../../../../shared/src/effectName";
import { IEffect } from "../../../../shared/src/interfaces/Effect";
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

  public toJsonData(): IEffect {
    return {
      id: this.id,
      name: this.name,
      duration: 0,
    };
  }
}

export default Effect;
