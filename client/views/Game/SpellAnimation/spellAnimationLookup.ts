import { PASSIVE_ACTION, SPELL_NAME } from "../../../../shared/constants";
import HealSpellAnimation from "../../../assets/sprites/heal_animation.png";
import MirrorAnimation from "../../../assets/sprites/mirror_animation.png";
import MirrorPierceAnimation from "../../../assets/sprites/mirror_pierce_animation.png";
import MirrorReflectAnimation from "../../../assets/sprites/mirror_reflect_animation.png";
import PoisonSpellAnimation from "../../../assets/sprites/poison_animation.png";
import PunchSpellAnimation from "../../../assets/sprites/punch_animation.png";
import ShieldSpellAnimation from "../../../assets/sprites/shield_animation.png";
import ShieldBlockAnimation from "../../../assets/sprites/shield_block_animation.png";
import ShieldPierceAnimation from "../../../assets/sprites/shield_pierce_animation.png";

export type AnimationProps = {
  steps: number;
  src: string;
};

const spellAnimationLookup: Partial<Record<SPELL_NAME | PASSIVE_ACTION, AnimationProps>> = {
  [SPELL_NAME.Punch]: {
    steps: 7,
    src: PunchSpellAnimation,
  },
  [SPELL_NAME.Heal]: {
    steps: 8,
    src: HealSpellAnimation,
  },
  [SPELL_NAME.Poison]: {
    steps: 8,
    src: PoisonSpellAnimation,
  },
  [SPELL_NAME.Shield]: {
    steps: 9,
    src: ShieldSpellAnimation,
  },
  [PASSIVE_ACTION.Block]: {
    steps: 8,
    src: ShieldBlockAnimation,
  },
  [PASSIVE_ACTION.ShieldPierce]: {
    steps: 8,
    src: ShieldPierceAnimation,
  },
  [SPELL_NAME.Mirror]: {
    steps: 6,
    src: MirrorAnimation,
  },
  [PASSIVE_ACTION.Reflect]: {
    steps: 8,
    src: MirrorReflectAnimation,
  },
  [PASSIVE_ACTION.MirrorPierce]: {
    steps: 8,
    src: MirrorPierceAnimation,
  },
};

export default spellAnimationLookup;
