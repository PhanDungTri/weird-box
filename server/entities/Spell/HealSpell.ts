import Player from "../Player";
import Spell from ".";
import { SPELL_NAME } from "../../../shared/constants";

class HealSpell extends Spell {
  constructor(chargePoint: number, caster: Player) {
    super(SPELL_NAME.Heal, caster, caster);
    this.strength = chargePoint;
  }

  public async trigger(): Promise<void> {
    this.target.changeHitPoint(this.strength);
    this.target.purify();
  }
}

export default HealSpell;
