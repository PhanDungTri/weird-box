import Spell from ".";
import { PassiveActionInfo } from "../../../shared/@types";
import { SPELL_NAME } from "../../../shared/constants";
import Player from "../Player";

abstract class PassiveSpell extends Spell {
  constructor(name: SPELL_NAME, target: Player, caster: Player) {
    super(name, caster, target, -1);
  }

  public async trigger(): Promise<void> {
    return;
  }

  public abstract activate(origin: Spell): AsyncGenerator<PassiveActionInfo, void, unknown>;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  protected getCommonInfo(origin: Spell) {
    return {
      id: this.id,
      target: this.caster.id,
      attacker: {
        name: origin.getCaster().getClient().name,
        spell: origin.name,
        strength: origin.getStrength(),
      },
      defender: {
        name: this.caster.getClient().name,
        spell: this.name,
        strength: this.getStrength(),
      },
    };
  }
}

export default PassiveSpell;
