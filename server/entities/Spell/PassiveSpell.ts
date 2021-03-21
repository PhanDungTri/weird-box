import Spell from ".";
import { PASSIVE_ACTION, SPELL_NAME } from "../../../shared/constants";
import Player from "../Player";

abstract class PassiveSpell extends Spell {
  constructor(name: SPELL_NAME, target: Player, caster: Player) {
    super(name, caster, target, -1);
  }

  public async trigger(): Promise<void> {
    return;
  }

  public abstract activate(origin: Spell): AsyncGenerator<PASSIVE_ACTION, void, unknown>;
}

export default PassiveSpell;
