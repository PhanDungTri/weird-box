import { SPELL_NAME } from "../../../shared/src/interfaces/Spell";
import { ICard } from "../../../shared/src/interfaces/Card";
import generateUniqueId from "../utilities/generateUniqueId";

class Card {
  public readonly id = generateUniqueId();

  constructor(private powerPoint: number, private spell: SPELL_NAME = SPELL_NAME.Void) {}

  public getPowerPoint(): number {
    return this.powerPoint;
  }

  public getSpell(): SPELL_NAME {
    return this.spell;
  }

  public toJson(): ICard {
    return {
      id: this.id,
      powerPoint: this.powerPoint,
      spell: [SPELL_NAME.Shield, SPELL_NAME.Mirror].includes(this.spell) ? SPELL_NAME.Void : this.spell,
    };
  }
}

export default Card;
