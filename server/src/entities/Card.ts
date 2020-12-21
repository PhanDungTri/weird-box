import EFFECT_NAME from "../../../shared/src/effectName";
import generateUniqueId from "../utilities/generateUniqueId";
import Effect from "./effects/Effect";

enum CARD_ACTION {
  Consume,
  Charge,
}

class Card {
  public readonly id = generateUniqueId();

  constructor(
    private powerPoint: number,
    private action: CARD_ACTION,
    private effect: EFFECT_NAME = EFFECT_NAME.Void
  ) {}

  public getAction(): CARD_ACTION {
    return this.action;
  }

  public getPowerPoint(): number {
    return this.powerPoint;
  }

  public getEffect(): EFFECT_NAME {
    return this.effect;
  }
}

export default Card;
export { CARD_ACTION };
