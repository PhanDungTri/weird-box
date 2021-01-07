import React from "react";
import { IPlayer } from "../../../../../../shared/src/interfaces/Player";
import EffectAnimation from "../../../../components/EffectAnimation";
import EffectList from "../../../../components/EffectList";
import HitPointBar from "../../../../components/HitPointBar";
import { useEffectAnimationTriggerState, useEffectTrackerState, useGameState } from "../../state";
import "./Opponent.scss";

const Opponent = ({ name, hp, id }: IPlayer): JSX.Element => {
  const { maxHP } = useGameState();
  const effects = useEffectTrackerState(id);
  const effectAnimation = useEffectAnimationTriggerState(id);

  return (
    <div className="opponent">
      <div className="opponent__name">{name}</div>
      <EffectList effects={effects} />
      <HitPointBar hp={hp} maxHP={maxHP} />
      <EffectAnimation effect={effectAnimation} />
    </div>
  );
};

export default Opponent;
