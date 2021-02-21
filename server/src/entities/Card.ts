import { SPELL_NAME } from "../../../shared/src/interfaces/Spell";
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

  public hideSpell(): void {
    this.spell = SPELL_NAME.Void;
  }
}

export default Card;
