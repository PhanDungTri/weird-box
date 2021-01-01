import React from "react";
import EffectAnimation from "../../../../components/EffectAnimation";
import EffectList from "../../../../components/EffectList";
import HitPointBar from "../../../../components/HitPointBar";
import IPlayer from "../../../../interfaces/IPlayer";
import "./Opponent.scss";

const Opponent = (props: IPlayer): JSX.Element => {
  return (
    <div className="opponent" key={props.id}>
      <div className="opponent__name">{props.name}</div>
      <EffectList owner={props.id} />
      <HitPointBar owner={props.id} />
      <EffectAnimation owner={props.id} />
    </div>
  );
};

export default Opponent;
