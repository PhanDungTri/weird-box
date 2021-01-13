import React from "react";
import { ISpell } from "../../../../shared/src/interfaces/Spell";
import "./SpellList.scss";
import SpellTracker from "./SpellTracker";

interface SpellListProps {
  spells: ISpell[];
}

const EffectList = ({ spells = [] }: SpellListProps): JSX.Element => {
  return (
    <div className="spell-list">
      {spells.map((eff) => (
        <SpellTracker key={eff.id} id={eff.id} duration={eff.duration} />
      ))}
    </div>
  );
};

export default EffectList;
