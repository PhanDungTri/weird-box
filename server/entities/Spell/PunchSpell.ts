import { SPELL_NAME } from "../../../shared/constants";
import Player from "../Player";
import Spell from ".";

class PunchSpell extends Spell {
  constructor(chargePoint: number, target: Player, caster: Player) {
    super(SPELL_NAME.Punch, target, caster);
    this.strength = chargePoint;
  }

  public async trigger(): Promise<void> {
    this.target.changeHitPoint(-this.strength);
  }
}

export default PunchSpell;
