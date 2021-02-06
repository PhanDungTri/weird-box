import React from "react";
import SPELL_NAME from "../../../../shared/src/SpellName";
import HealSpellAnimation from "../../assets/sprites/heal_animation.png";
import PoisonSpellAnimation from "../../assets/sprites/poison_animation.png";
import PunchSpellAnimation from "../../assets/sprites/punch_animation.png";
import Sprite from "../Sprite";

interface SpellAnimationProps {
  spell: SPELL_NAME;
}

const setSpellAnimation = (spell: SPELL_NAME): JSX.Element => {
  let animationProps = {
    step: 1,
    src: "",
  };

  switch (spell) {
    case SPELL_NAME.Punch: {
      animationProps = {
        step: 7,
        src: PunchSpellAnimation,
      };

      break;
    }
    case SPELL_NAME.Heal: {
      animationProps = {
        step: 8,
        src: HealSpellAnimation,
      };

      break;
    }
    case SPELL_NAME.Poison: {
      animationProps = {
        step: 8,
        src: PoisonSpellAnimation,
      };

      break;
    }
    default:
      return <></>;
  }
  return <Sprite style={{ zIndex: 2 }} {...animationProps} tick={3} repeat={0} size={[62, 46]} scale={2} centerize />;
};

const SpellAnimation = (props: SpellAnimationProps): JSX.Element => {
  return setSpellAnimation(props.spell);
};

export default SpellAnimation;
