import React, { useState } from "react";
import { IEffect, IEffectEvent } from "../../../../shared/src/interfaces/Effect";
import SOCKET_EVENT from "../../../../shared/src/socketEvent";
import useSocketEvent from "../../hooks/useSocketEvent";
import "./EffectList.scss";
import EffectTracker from "./EffectTracker";

interface EffectListProps {
  owner: string;
}

const EffectList = (props: EffectListProps): JSX.Element => {
  const [effects, setEffectList] = useState<IEffect[]>([]);

  useSocketEvent(SOCKET_EVENT.TakeEffect, (data: IEffectEvent) => {
    if (data.target === props.owner && data.effect.duration > 0) {
      setEffectList((list) => [...list, data.effect]);
    }
  });

  useSocketEvent(SOCKET_EVENT.TickEffect, (data: IEffectEvent) => {
    if (data.target === props.owner) {
      setEffectList((list) => {
        if (data.effect.duration === 0) {
          return list.filter((eff) => eff.id !== data.effect.id);
        }

        const index = list.findIndex((eff) => eff.id === data.effect.id);

        if (index === -1) return list;

        const updatedList = [...list];
        updatedList[index].duration = data.effect.duration;
        return updatedList;
      });
    }
  });

  return (
    <div className="effect-list">
      {effects.map((eff) => (
        <EffectTracker key={eff.id} id={eff.id} duration={eff.duration} />
      ))}
    </div>
  );
};

export default EffectList;
