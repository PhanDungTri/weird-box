import Spell from ".";
import { PASSIVE_ACTION, SPELL_NAME } from "../../../../shared/src/interfaces/Spell";
import waitFor from "../../utilities/waitFor";
import Player from "../Player";
import PassiveSpell from "./PassiveSpell";

class ShieldSpell extends PassiveSpell {
  constructor(chargePoint: number, caster: Player) {
    super(SPELL_NAME.Shield, caster, caster);
    this.power = chargePoint;
  }

  public async activate(origin: Spell): Promise<void> {
    const partialData = {
      id: this.id,
      target: this.target.getClient().id,
    };

    if (origin.getPower() > this.power) {
      this.target.getBoardcaster().dispatchTriggerPassive({
        ...partialData,
        action: PASSIVE_ACTION.Pierce,
      });
      await waitFor(600);
      this.target.takeSpell(origin, true);
    } else {
      this.target.getBoardcaster().dispatchTriggerPassive({
        ...partialData,
        action: PASSIVE_ACTION.Block,
      });
      await waitFor(600);
    }
  }
}

export default ShieldSpell;
