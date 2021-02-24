import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ISpell } from "../../../../shared/src/interfaces/Spell";
import "./SpellList.scss";
import SpellTracker from "./SpellTracker";

interface SpellListProps {
  spells: ISpell[];
  align?: "center" | "left";
}

const SpellList = ({ spells = [], align = "center" }: SpellListProps): JSX.Element => {
  return (
    <TransitionGroup className={`spell-list -align-${align} ${spells.length === 0 ? "-empty" : ""}`}>
      {spells.map((s) => (
        <CSSTransition classNames="spell-transition" timeout={600} key={s.id}>
          <SpellTracker id={s.id} name={s.name} counter={s.duration === -1 ? s.power : s.duration} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default SpellList;
