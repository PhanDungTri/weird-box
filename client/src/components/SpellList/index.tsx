import React, { useEffect, useRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ISpell } from "../../../../shared/src/interfaces/Spell";
import "./SpellList.scss";
import SpellTracker from "./SpellTracker";

interface SpellListProps {
  spells: ISpell[];
  align?: "center" | "left";
}

const SpellList = ({ spells = [], align = "center" }: SpellListProps): JSX.Element => {
  const counter = useRef(0);

  useEffect(() => {
    console.log(counter.current++);
  }, [spells]);

  return (
    <TransitionGroup className={`spell-list -align-${align}`}>
      {spells.map((s) => (
        <CSSTransition classNames="spell-transition" timeout={600} key={s.id}>
          <SpellTracker id={s.id} name={s.name} duration={s.duration} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default SpellList;
