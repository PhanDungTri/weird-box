import React from "react";
import SpellAnimation from "../../../../../components/SpellAnimation";
import Status from "../../../../../components/Status";
import { PlayerState } from "../../../business/reducers/playerListReducer";
import "./Opponent.scss";

interface OpponentProps {
  info: PlayerState;
}

const Opponent = ({ info }: OpponentProps): JSX.Element => {
  return (
    <div className={`opponent ${info.isEliminated ? "-disabled" : ""}`}>
      <Status id={info.id} hp={info.hp} spells={Object.values(info.spells)} />
      <div className="opponent__name">{info.name}</div>
      <SpellAnimation name={info.currentSpell} />
    </div>
  );
};

export default Opponent;
