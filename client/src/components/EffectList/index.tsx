import React, { useState } from "react";
import EFFECT_CATEGORY from "../../../../shared/src/effectCategory";
import EFFECT_NAME from "../../../../shared/src/effectName";
import SOCKET_EVENT from "../../../../shared/src/socketEvent";
import useSocketEvent from "../../hooks/useSocketEvent";
import "./EffectList.scss";
import EffectTracker from "./EffectTracker";

interface EffectListProps {
  owner: string;
}

interface IEffect {
  id: string;
  name: EFFECT_NAME;
  category: EFFECT_CATEGORY;
}

interface ITakeEffectRes {
  id: string;
  effect: IEffect;
}

const EffectList = (props: EffectListProps): JSX.Element => {
  const [effects, setEffectList] = useState<IEffect[]>([]);

  useSocketEvent(SOCKET_EVENT.TakeEffect, (data: ITakeEffectRes) => {
    if (data.id === props.owner && data.effect.category === EFFECT_CATEGORY.OverTime) {
      setEffectList((list) => [...list, data.effect]);
    }
  });

  return (
    <div className="effect-list">
      {effects.map((eff) => (
        <EffectTracker key={eff.id} />
      ))}
    </div>
  );
};

export default EffectList;
