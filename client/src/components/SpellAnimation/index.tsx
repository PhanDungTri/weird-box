import React from "react";
import SPELL_NAME from "../../../../shared/src/SpellName";
import HealSpellAnimation from "../../assets/sprites/heal_animation.png";
import PoisonSpellAnimation from "../../assets/sprites/poison_animation.png";
import PunchSpellAnimation from "../../assets/sprites/punch_animation.png";
import Sprite from "../Sprite";

interface SpellAnimationProps {
  spell: SPELL_NAME;
  scale?: number;
}

const animationProps: Record<SPELL_NAME, { step: number; src: string }> = {
  [SPELL_NAME.Void]: {
    step: 1,
    src: "",
  },
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
};

const SpellAnimation = ({ spell, scale = 2 }: SpellAnimationProps): JSX.Element => {
  return spell === SPELL_NAME.Void ? (
    <></>
  ) : (
    <Sprite
      style={{ zIndex: 2 }}
      {...animationProps[spell]}
      tick={3}
      repeat={0}
      size={[62, 46]}
      scale={scale}
      centerize
    />
  );
};

export default SpellAnimation;
