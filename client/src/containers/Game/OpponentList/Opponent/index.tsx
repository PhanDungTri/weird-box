import React, { useState } from "react";
import EFFECT_NAME from "../../../../../../shared/src/effectName";
import SOCKET_EVENT from "../../../../../../shared/src/socketEvent";
import HealEffectAnimation from "../../../../assets/sprites/heal_animation.png";
import PoisonEffectAnimation from "../../../../assets/sprites/poison_animation.png";
import PunchEffectAnimation from "../../../../assets/sprites/punch_animation.png";
import HitPointBar from "../../../../components/HitPointBar";
import Sprite from "../../../../components/Sprite";
import useSocketEvent from "../../../../hooks/useSocketEvent";
import IPlayer from "../../../../interfaces/IPlayer";

interface IEffectRes {
  id: string;
  effect: EFFECT_NAME;
}

const setEffectAnimation = (effect: EFFECT_NAME): JSX.Element => {
  switch (effect) {
    case EFFECT_NAME.Punch:
      return (
        <Sprite
          key={EFFECT_NAME.Punch}
          step={7}
          tick={3}
          src={PunchEffectAnimation}
          repeat={0}
          size={[62, 46]}
          scale={2}
          centerize
        />
      );
    case EFFECT_NAME.Heal:
      return (
        <Sprite
          key={EFFECT_NAME.Heal}
          step={8}
          tick={3}
          src={HealEffectAnimation}
          repeat={0}
          size={[62, 46]}
          scale={2}
          centerize
        />
      );
    case EFFECT_NAME.Poison:
      return (
        <Sprite
          key={EFFECT_NAME.Poison}
          step={11}
          tick={3}
          src={PoisonEffectAnimation}
          repeat={0}
          size={[62, 46]}
          scale={2}
          centerize
        />
      );
    default:
      return <></>;
  }
};

const Opponent = (props: IPlayer): JSX.Element => {
  const [effect, setEffect] = useState<EFFECT_NAME>(EFFECT_NAME.Void);

  useSocketEvent(SOCKET_EVENT.TakeEffect, (data: IEffectRes) => {
    if (data.id === props.id) {
      setEffect(data.effect);
      setTimeout(() => setEffect(EFFECT_NAME.Void), 600);
    }
  });

  return (
    <div className="opponent-card" key={props.id}>
      <div className="opponent-name">{props.name}</div>
      <div />
      <HitPointBar owner={props.id} />
      {setEffectAnimation(effect)}
    </div>
  );
};

export default Opponent;
