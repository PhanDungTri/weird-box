import React, { useState } from "react";
import EFFECT_NAME from "../../../../../../shared/src/effectName";
import SOCKET_EVENT from "../../../../../../shared/src/socketEvent";
import HitPointBar from "../../../../components/HitPointBar";
import Sprite from "../../../../components/Sprite";
import useSocketEvent from "../../../../hooks/useSocketEvent";
import PunchEffectAnimation from "../../../../assets/sprites/punch_animation.png";
import HealEffectAnimation from "../../../../assets/sprites/heal_animation.png";

interface IPlayer {
  id: string;
  name: string;
}

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
          tick={2}
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
          tick={2}
          src={HealEffectAnimation}
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
      setTimeout(() => setEffect(EFFECT_NAME.Void), 400);
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
