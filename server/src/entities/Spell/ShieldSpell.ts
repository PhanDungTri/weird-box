import Spell from ".";
import { PASSIVE_ACTION, SPELL_NAME } from "../../../../shared/src/interfaces/Spell";
import Player from "../Player";
import PassiveSpell from "./PassiveSpell";

class ShieldSpell extends PassiveSpell {
  constructor(chargePoint: number, caster: Player) {
    super(SPELL_NAME.Shield, caster, caster);
    this.power = chargePoint;
  }

  public *activate(origin: Spell): Generator<PASSIVE_ACTION, void, unknown> {
    if (origin.getPower() < this.getPower()) {
      yield PASSIVE_ACTION.Block;
    } else {
      yield PASSIVE_ACTION.Pierce;
      this.target.takeSpell(origin, true);
    }
  }
}

export default ShieldSpell;
