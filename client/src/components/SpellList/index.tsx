import React, { useEffect, useRef } from "react";
import { animated, useTransition } from "react-spring";
import { ISpell } from "../../../../shared/src/interfaces/Spell";
import "./SpellList.scss";
import SpellTracker from "./SpellTracker";

interface SpellListProps {
  spells: ISpell[];
  align?: "center" | "left";
}

const SpellList = ({ spells = [], align = "center" }: SpellListProps): JSX.Element => {
  const counter = useRef(0);
  const transitions = useTransition(spells, (spell) => spell.id, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  useEffect(() => {
    console.log(counter.current++);
  }, [spells]);

  return (
    <div className={`spell-list -align-${align}`}>
      {transitions.map(({ item, key, props }) => (
        <animated.div key={key} style={props}>
          <SpellTracker id={item.id} name={item.name} duration={item.duration} />
        </animated.div>
      ))}
    </div>
  );
};

export default SpellList;
