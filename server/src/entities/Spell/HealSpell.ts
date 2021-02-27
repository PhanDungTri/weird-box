import Player from "../Player";
import Spell from ".";
import { SPELL_NAME } from "../../../../shared/src/@enums";

class HealSpell extends Spell {
  constructor(chargePoint: number, caster: Player) {
    super(SPELL_NAME.Heal, caster, caster);
    this.power = chargePoint;
  }

  public async trigger(): Promise<void> {
    await this.target.changeHitPoint(this.power);
  }
}

export default HealSpell;
