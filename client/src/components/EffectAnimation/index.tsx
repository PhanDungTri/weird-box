import React from "react";
import EFFECT_NAME from "../../../../shared/src/effectName";
import HealEffectAnimation from "../../assets/sprites/heal_animation.png";
import PoisonEffectAnimation from "../../assets/sprites/poison_animation.png";
import PunchEffectAnimation from "../../assets/sprites/punch_animation.png";
import Sprite from "../Sprite";

interface EffectAnimationProps {
  effect: EFFECT_NAME;
}

const setEffectAnimation = (effect: EFFECT_NAME): JSX.Element => {
  let animationProps = {
    step: 1,
    src: "",
  };

  switch (effect) {
    case EFFECT_NAME.Punch: {
      animationProps = {
        step: 7,
        src: PunchEffectAnimation,
      };

      break;
    }
    case EFFECT_NAME.Heal: {
      animationProps = {
        step: 8,
        src: HealEffectAnimation,
      };

      break;
    }
    case EFFECT_NAME.Poison: {
      animationProps = {
        step: 11,
        src: PoisonEffectAnimation,
      };

      break;
    }
    default:
      return <></>;
  }
  return <Sprite {...animationProps} tick={3} repeat={0} size={[62, 46]} scale={2} centerize />;
};

const EffectAnimation = (props: EffectAnimationProps): JSX.Element => {
  return setEffectAnimation(props.effect);
};

export default EffectAnimation;
