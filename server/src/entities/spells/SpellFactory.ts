import SPELL_NAME from "../../../../shared/src/SpellName";
import Player from "../Player";
import HealSpell from "./HealSpell";
import PoisonSpell from "./PoisonSpell";
import PunchSpell from "./PunchSpell";

class SpellFactory {
  public static create(name: SPELL_NAME, chargePoint: number, players: Player[], caster: Player): void {
    switch (name) {
      case SPELL_NAME.Punch: {
        players.filter((p) => p !== caster).forEach((p) => p.takeSpell(new PunchSpell(chargePoint, p, caster)));
        break;
      }
      case SPELL_NAME.Heal: {
        caster.takeSpell(new HealSpell(chargePoint, caster));
        break;
      }
      case SPELL_NAME.Poison: {
        players.filter((p) => p !== caster).forEach((p) => p.takeSpell(new PoisonSpell(chargePoint, p, caster)));
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
