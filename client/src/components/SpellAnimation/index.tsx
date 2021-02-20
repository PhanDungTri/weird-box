import React from "react";
import { PASSIVE_ACTION, SPELL_NAME } from "../../../../shared/src/interfaces/Spell";
import HealSpellAnimation from "../../assets/sprites/heal_animation.png";
import PoisonSpellAnimation from "../../assets/sprites/poison_animation.png";
import PunchSpellAnimation from "../../assets/sprites/punch_animation.png";
import ShieldSpellAnimation from "../../assets/sprites/shield_animation.png";
import ShieldBlockAnimation from "../../assets/sprites/shield_block_animation.png";
import ShieldPierceAnimation from "../../assets/sprites/shield_pierce_animation.png";
import MirrorReflectAnimation from "../../assets/sprites/mirror_reflect_animation.png";
import MirrorPierceAnimation from "../../assets/sprites/mirror_pierce_animation.png";
import Sprite from "../Sprite";

interface SpellAnimationProps {
  name: SPELL_NAME | PASSIVE_ACTION;
  scale?: number;
}

const animationProps: Partial<Record<SPELL_NAME | PASSIVE_ACTION, { step: number; src: string }>> = {
  [SPELL_NAME.Punch]: {
    step: 7,
    src: PunchSpellAnimation,
  },
  [SPELL_NAME.Heal]: {
    step: 8,
    src: HealSpellAnimation,
  },
  [SPELL_NAME.Poison]: {
    step: 8,
    src: PoisonSpellAnimation,
  },
  [SPELL_NAME.Shield]: {
    step: 9,
    src: ShieldSpellAnimation,
  },
  [PASSIVE_ACTION.Block]: {
    step: 8,
    src: ShieldBlockAnimation,
  },
  [PASSIVE_ACTION.ShieldPierce]: {
    step: 8,
    src: ShieldPierceAnimation,
  },
  [PASSIVE_ACTION.Reflect]: {
    step: 8,
    src: MirrorReflectAnimation,
  },
  [PASSIVE_ACTION.MirrorPierce]: {
    step: 8,
    src: MirrorPierceAnimation,
  },
};

const SpellAnimation = ({ name, scale = 2 }: SpellAnimationProps): JSX.Element => {
  return name === SPELL_NAME.Void ? (
    <></>
  ) : (
    <Sprite
      style={{ zIndex: 2 }}
      {...animationProps[name]}
      tick={3}
      repeat={0}
      size={[62, 46]}
      scale={scale}
      centerize
    />
  );
};

export default SpellAnimation;
