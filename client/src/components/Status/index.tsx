import React from "react";
import { ISpell } from "../../../../shared/src/interfaces/Spell";
import { useCurrentPlayerContext, useGameInfoContext } from "../../containers/Game/business/context";
import HitPointBar from "../HitPointBar";
import SpellList from "../SpellList";
import Timer from "../Timer";
import "./Status.scss";

interface StatusProps {
  id: string;
  hp?: number;
  spells: ISpell[];
  horizontal?: boolean;
}

const Status = ({ id, hp = 0, spells, horizontal = false }: StatusProps): JSX.Element => {
  const { maxHP, timePerTurn } = useGameInfoContext();
  const { currentPlayer } = useCurrentPlayerContext();

  return (
    <div className={`status ${horizontal ? "-horizontal" : ""}`}>
      <HitPointBar maxHP={maxHP} hp={hp} />
      <SpellList spells={spells} align={horizontal ? "left" : "center"} />
      <Timer duration={timePerTurn} fluid={horizontal} isRunning={id === currentPlayer} />
    </div>
  );
};

export default Status;
