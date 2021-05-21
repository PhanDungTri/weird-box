import { SPELL_NAME } from "../../shared/constants";
import { generateUniqueId } from "../../shared/utils";

class Card {
  public readonly id = generateUniqueId();

  constructor(private power: number, private spell: SPELL_NAME = SPELL_NAME.Void) {}

  public getPower(): number {
    return this.power;
  }

  public getSpell(): SPELL_NAME {
    return this.spell;
  }
}

export default Card;
