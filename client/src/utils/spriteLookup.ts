import { SPELL_NAME } from "../../../shared/src/@enums";
import HealSpellSprite from "../assets/sprites/heal.png";
import PoisonSpellSprite from "../assets/sprites/poison.png";
import PunchSpellSprite from "../assets/sprites/punch.png";
import ShieldSpellSprite from "../assets/sprites/shield.png";
import ChargeSprite from "../assets/sprites/charge.png";
import ConsumeSprite from "../assets/sprites/consume.png";
import MirrorSpellSprite from "../assets/sprites/mirror.png";

const spriteLookup: Record<string, string> = {
  [SPELL_NAME.Heal]: HealSpellSprite,
  [SPELL_NAME.Punch]: PunchSpellSprite,
  [SPELL_NAME.Poison]: PoisonSpellSprite,
  [SPELL_NAME.Shield]: ShieldSpellSprite,
  [SPELL_NAME.Mirror]: MirrorSpellSprite,
  Charge: ChargeSprite,
  Consume: ConsumeSprite,
};

export default spriteLookup;
