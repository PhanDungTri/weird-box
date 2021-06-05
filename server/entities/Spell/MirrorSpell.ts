import Spell from ".";
import { PassiveActionInfo } from "../../../shared/@types";
import { SPELL_NAME, PASSIVE_ACTION } from "../../../shared/constants";
import Player from "../Player";
import PassiveSpell from "./PassiveSpell";

class MirrorSpell extends PassiveSpell {
  constructor(chargePoint: number, caster: Player) {
    super(SPELL_NAME.Mirror, caster, caster);
    this.strength = chargePoint;
  }

  public async *activate(origin: Spell): AsyncGenerator<PassiveActionInfo, void, unknown> {
    const commonInfo = this.getCommonInfo(origin);

    if (origin.getStrength() <= this.getStrength()) {
      yield {
        ...commonInfo,
        action: PASSIVE_ACTION.Reflect,
        message: "mirrorReflectMessage",
      };
      const caster = origin.getCaster();
      origin.setTarget(caster);
      origin.setCaster(this.target);
      await caster.takeSpell(origin);
    } else {
      yield {
        ...commonInfo,
        action: PASSIVE_ACTION.MirrorPierce,
        message: "mirrorPiercedMessage",
      };
      await this.target.takeSpell(origin);
    }
  }
}

export default MirrorSpell;
