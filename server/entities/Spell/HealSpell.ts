import Player from "../Player";
import Spell from ".";
import { SPELL_NAME } from "../../../shared/constants";

class HealSpell extends Spell {
  constructor(chargePoint: number, caster: Player) {
    super(SPELL_NAME.Heal, caster, caster);
    this.power = chargePoint;
  }

  public async trigger(): Promise<void> {
    this.target.changeHitPoint(this.power);
  }
}

export default HealSpell;
