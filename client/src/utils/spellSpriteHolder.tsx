import SPELL_NAME from "../../../shared/src/SpellName";
import HealSpellSprite from "../assets/sprites/heal.png";
import PoisonSpellSprite from "../assets/sprites/poison.png";
import PunchSpellSprite from "../assets/sprites/punch.png";

const spellSpriteHolder: Record<string, string> = {
  [SPELL_NAME.Heal]: HealSpellSprite,
  [SPELL_NAME.Punch]: PunchSpellSprite,
  [SPELL_NAME.Poison]: PoisonSpellSprite,
};

export default spellSpriteHolder;
