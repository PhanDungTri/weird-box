import Spell from ".";
import { PassiveActionInfo } from "../../../shared/@types";
import { PASSIVE_ACTION, SPELL_NAME } from "../../../shared/constants";
import Player from "../Player";
import PassiveSpell from "./PassiveSpell";

class ShieldSpell extends PassiveSpell {
  constructor(chargePoint: number, caster: Player) {
    super(SPELL_NAME.Shield, caster, caster);
    this.strength = chargePoint;
  }

  public async *activate(origin: Spell): AsyncGenerator<PassiveActionInfo, void, unknown> {
    const commonInfo = this.getCommonInfo(origin);

    if (origin.getStrength() <= this.getStrength()) {
      yield {
        ...commonInfo,
        action: PASSIVE_ACTION.Block,
        message: "shieldBlockMessage",
      };
    } else {
      yield {
        ...commonInfo,
        action: PASSIVE_ACTION.ShieldPierce,
        message: "shieldPiercedMessage",
      };
      origin.setStrength(origin.getStrength() - 1);
      await this.target.takeSpell(origin);
    }
  }
}

export default ShieldSpell;
