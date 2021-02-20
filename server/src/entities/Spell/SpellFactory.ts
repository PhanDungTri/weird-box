import { SPELL_NAME } from "../../../../shared/src/interfaces/Spell";
import Player from "../Player";
import HealSpell from "./HealSpell";
import MirrorSpell from "./MirrorSpell";
import PoisonSpell from "./PoisonSpell";
import PunchSpell from "./PunchSpell";
import ShieldSpell from "./ShieldSpell";

class SpellFactory {
  public static create(name: SPELL_NAME, chargePoint: number, targets: Player[], caster: Player): void {
    switch (name) {
      case SPELL_NAME.Punch: {
        targets.filter((p) => p !== caster).forEach((p) => p.takeSpell(new PunchSpell(chargePoint, p, caster)));
        break;
      }
      case SPELL_NAME.Heal: {
        caster.takeSpell(new HealSpell(chargePoint, caster));
        break;
      }
      case SPELL_NAME.Poison: {
        targets.filter((p) => p !== caster).forEach((p) => p.takeSpell(new PoisonSpell(chargePoint, p, caster)));
        break;
      }
      case SPELL_NAME.Shield: {
        caster.takeSpell(new ShieldSpell(chargePoint, caster));
        break;
      }
      case SPELL_NAME.Mirror: {
        caster.takeSpell(new MirrorSpell(chargePoint, caster));
        break;
      }
      case SPELL_NAME.Void: {
        break;
      }
      default: {
        throw new Error("Invalid spell");
      }
    }
  }
}

export default SpellFactory;
