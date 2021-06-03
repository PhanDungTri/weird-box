import Spell from ".";
import { SPELL_NAME } from "../../../shared/constants";
import Player from "../Player";

class PoisonSpell extends Spell {
  constructor(chargePoint: number, target: Player, caster: Player) {
    super(SPELL_NAME.Poison, target, caster, 3);
    this.power = chargePoint;
  }

  public async trigger(): Promise<void> {
    const newHP = this.target.getHitPoint() - this.power;

    if (newHP <= 1) this.target.changeHitPoint(-this.target.getHitPoint() + 1);
    else this.target.changeHitPoint(-this.power);

    this.duration--;
  }
}

export default PoisonSpell;
