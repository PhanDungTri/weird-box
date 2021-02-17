import Spell from ".";
import { SPELL_NAME } from "../../../../shared/src/interfaces/Spell";
import Player from "../Player";

abstract class PassiveSpell extends Spell {
  constructor(name: SPELL_NAME, target: Player, caster: Player) {
    super(name, caster, target, -1);
  }

  public trigger(): void {
    return;
  }

  public abstract activate(origin: Spell): void;
}

export default PassiveSpell;
