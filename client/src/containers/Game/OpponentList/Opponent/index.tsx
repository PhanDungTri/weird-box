import React, { useState } from "react";
import EFFECT_NAME from "../../../../../../shared/src/effectName";
import SOCKET_EVENT from "../../../../../../shared/src/socketEvent";
import HealEffectAnimation from "../../../../assets/sprites/heal_animation.png";
import PoisonEffectAnimation from "../../../../assets/sprites/poison_animation.png";
import PunchEffectAnimation from "../../../../assets/sprites/punch_animation.png";
import EffectList from "../../../../components/EffectList";
import HitPointBar from "../../../../components/HitPointBar";
import Sprite from "../../../../components/Sprite";
import useSocketEvent from "../../../../hooks/useSocketEvent";
import IPlayer from "../../../../interfaces/IPlayer";
import "./Opponent.scss";

interface IEffectRes {
  id: string;
  effect: {
    id: string;
    name: EFFECT_NAME;
    duration: number;
  };
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

  const animate = (data: IEffectRes) => {
    // TODO test here!
    if (data.id === props.id) {
      setEffect(data.effect.name);
      setTimeout(() => setEffect(EFFECT_NAME.Void), 600);
    }
  };

  useSocketEvent(SOCKET_EVENT.TakeEffect, animate);
  useSocketEvent(SOCKET_EVENT.TickEffect, animate);

  return (
    <div className="opponent" key={props.id}>
      <div className="opponent__name">{props.name}</div>
      <EffectList owner={props.id} />
      <HitPointBar owner={props.id} />
      {setEffectAnimation(effect)}
    </div>
  );
};

export default Opponent;
