import SPELL_NAME from "../../../shared/src/SpellName";
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
}

export default Card;
