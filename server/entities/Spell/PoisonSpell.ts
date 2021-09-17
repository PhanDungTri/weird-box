import Spell from ".";
import { SPELL_NAME } from "../../../shared/constants";
import Player from "../Player";

class PoisonSpell extends Spell {
  constructor(chargePoint: number, target: Player, caster: Player) {
    super(SPELL_NAME.Poison, target, caster, 2);
    this.strength = chargePoint;
  }

  public async trigger(): Promise<void> {
    this.target.changeHitPoint(-this.strength);
    this.duration--;
  }
}

export default PoisonSpell;
