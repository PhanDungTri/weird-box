import SPELL_NAME from "../../../../shared/src/SpellName";
import Player from "../Player";
import Debuff from "./Debuff";

class PoisonSpell extends Debuff {
  constructor(chargePoint: number, target: Player, caster: Player) {
    super(SPELL_NAME.Poison, target, caster, 3);
    this.power = chargePoint;
  }

  public trigger(): void {
    this.target.changeHitPoint(-this.power);
    this.duration--;

    if (this.duration <= 0) this.target.removeDebuff(this);
  }
}

export default PoisonSpell;
