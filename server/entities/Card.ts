import { SPELL_NAME } from "../../shared/constants";
import { CardInfo } from "../../shared/@types";
import generateUniqueId from "../../shared/utils/generateUniqueId";

class Card {
  public readonly id = generateUniqueId();

  constructor(private power: number, private spell: SPELL_NAME = SPELL_NAME.Void) {}

  public getPower(): number {
    return this.power;
  }

  public getSpell(): SPELL_NAME {
    return this.spell;
  }

  public toJsonData(): CardInfo {
    return {
      id: this.id,
      power: this.power,
      spell: [SPELL_NAME.Shield, SPELL_NAME.Mirror].includes(this.spell) ? SPELL_NAME.Void : this.spell,
    };
  }
}

export default Card;
