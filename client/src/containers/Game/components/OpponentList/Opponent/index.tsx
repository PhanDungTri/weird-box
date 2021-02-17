import React from "react";
import HitPointBar from "../../../../../components/HitPointBar";
import SpellAnimation from "../../../../../components/SpellAnimation";
import SpellList from "../../../../../components/SpellList";
import { useGameInfoContext } from "../../../business/context";
import { PlayerState } from "../../../business/reducers/playerListReducer";
import "./Opponent.scss";

interface OpponentProps {
  info: PlayerState;
}

const Opponent = ({ info }: OpponentProps): JSX.Element => {
  const { maxHP } = useGameInfoContext();

  return (
    <div className={`opponent ${info.isEliminated ? "-disabled" : ""}`}>
      <div className="opponent__name">{info.name}</div>
      <SpellList spells={Object.values(info.spells)} />
      <HitPointBar hp={info.hp} maxHP={maxHP} />
      <SpellAnimation name={info.currentSpell} />
    </div>
  );
};

export default Opponent;
