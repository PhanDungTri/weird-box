import EFFECT_NAME from "../../../shared/src/effectName";
import generateUniqueId from "../utilities/generateUniqueId";

class Card {
  public readonly id = generateUniqueId();

  constructor(private powerPoint: number, private effect: EFFECT_NAME = EFFECT_NAME.Void) {}

  public getPowerPoint(): number {
    return this.powerPoint;
  }

  public getEffect(): EFFECT_NAME {
    return this.effect;
  }
}

export default Card;
