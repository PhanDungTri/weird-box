import generateUniqueId from "../utilities/generateUniqueId";

enum CardAction {
  Consume,
  Charge,
}

class Card {
  public readonly id = generateUniqueId();

  constructor(private powerPoint: number, private action: CardAction) {}

  public getAction(): CardAction {
    return this.action;
  }

  public getPowerPoint(): number {
    return this.powerPoint;
  }
}

export default Card;
export { CardAction };
