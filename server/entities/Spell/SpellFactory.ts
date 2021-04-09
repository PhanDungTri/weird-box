import { SPELL_NAME } from "../../../shared/constants";
import Player from "../Player";
import HealSpell from "./HealSpell";
import MirrorSpell from "./MirrorSpell";
import PoisonSpell from "./PoisonSpell";
import PunchSpell from "./PunchSpell";
import ShieldSpell from "./ShieldSpell";

class SpellFactory {
  public static async create(name: SPELL_NAME, chargePoint: number, players: Player[], caster: Player): Promise<void> {
    switch (name) {
      case SPELL_NAME.Punch: {
        for (const p of players) if (p !== caster) await p.takeSpell(new PunchSpell(chargePoint, p, caster));
        break;
      }
      case SPELL_NAME.Heal: {
        await caster.takeSpell(new HealSpell(chargePoint, caster));
        break;
      }
      case SPELL_NAME.Poison: {
        for (const p of players) if (p !== caster) await p.takeSpell(new PoisonSpell(chargePoint, p, caster));
        break;
      }
      case SPELL_NAME.Shield: {
        await caster.takeSpell(new ShieldSpell(chargePoint, caster));
        break;
      }
      case SPELL_NAME.Mirror: {
        await caster.takeSpell(new MirrorSpell(chargePoint, caster));
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
