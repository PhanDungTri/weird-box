import React from "react";
import EffectAnimation from "../../../../components/EffectAnimation";
import EffectList from "../../../../components/EffectList";
import HitPointBar from "../../../../components/HitPointBar";
import { useGameContext } from "../../Game.context";
import "./Opponent.scss";

interface OpponentProps {
  id: string;
}

const Opponent = ({ id }: OpponentProps): JSX.Element => {
  const { maxHP, getPlayerById, getEffectsOfPlayer, getEffectAnimationOfPlayer } = useGameContext();
  const effectList = getEffectsOfPlayer(id);
  const { name, hp } = getPlayerById(id);
  const effectAnimation = getEffectAnimationOfPlayer(id);

  return (
    <div className="opponent">
      <div className="opponent__name">{name}</div>
      <EffectList effects={effectList} />
      <HitPointBar hp={hp} maxHP={maxHP} />
      <EffectAnimation effect={effectAnimation} />
    </div>
  );
};

export default Opponent;
