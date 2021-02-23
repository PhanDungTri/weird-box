import { SPELL_NAME } from "../../../../shared/src/interfaces/Spell";
import Player from "../Player";
import Spell from ".";

class PunchSpell extends Spell {
  constructor(chargePoint: number, target: Player, caster: Player) {
    super(SPELL_NAME.Punch, target, caster);
    this.power = chargePoint;
  }

  public async trigger(): Promise<void> {
    await this.target.changeHitPoint(-this.power);
  }
}

export default PunchSpell;
