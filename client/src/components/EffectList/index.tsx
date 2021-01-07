import React from "react";
import { IEffect } from "../../../../shared/src/interfaces/Effect";
import "./EffectList.scss";
import EffectTracker from "./EffectTracker";

interface EffectListProps {
  effects: IEffect[];
}

const EffectList = ({ effects = [] }: EffectListProps): JSX.Element => {
  return (
    <div className="effect-list">
      {effects.map((eff) => (
        <EffectTracker key={eff.id} id={eff.id} duration={eff.duration} />
      ))}
    </div>
  );
};

export default EffectList;
