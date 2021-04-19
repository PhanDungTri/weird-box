import Spell from ".";
import { PASSIVE_ACTION, SPELL_NAME } from "../../../shared/constants";
import Player from "../Player";
import PassiveSpell from "./PassiveSpell";

class ShieldSpell extends PassiveSpell {
  constructor(chargePoint: number, caster: Player) {
    super(SPELL_NAME.Shield, caster, caster);
    this.power = chargePoint;
  }

  public async *activate(origin: Spell): AsyncGenerator<PASSIVE_ACTION, void, unknown> {
    if (origin.getPower() <= this.getPower()) {
      yield PASSIVE_ACTION.Block;
    } else {
      yield PASSIVE_ACTION.ShieldPierce;
      await this.target.takeSpell(origin);
    }
  }
}

export default ShieldSpell;
