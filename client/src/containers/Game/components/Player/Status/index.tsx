import React from "react";
import { ISpell } from "../../../../../../../shared/src/interfaces/Spell";
import HitPointBar from "../../../../../components/HitPointBar";
import SpellList from "../../../../../components/SpellList";
import { useGameInfoContext } from "../../../business/context";
import "./Status.scss";

interface StatusProps {
  hp?: number;
  spells: ISpell[];
}

const Status = ({ hp = 0, spells }: StatusProps): JSX.Element => {
  const { maxHP } = useGameInfoContext();
  return (
    <div className="player__status">
      <HitPointBar maxHP={maxHP} hp={hp} />
      <SpellList spells={spells} align="left" />
    </div>
  );
};

export default Status;
