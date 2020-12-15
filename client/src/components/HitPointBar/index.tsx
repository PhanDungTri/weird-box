import React, { useState } from "react";
import { useGameContext } from "../../containers/Game/Game.context";
import useSocketEvent from "../../hooks/useSocketEvent";
import "./HitPointBar.scss";

interface HitPointBarProps {
  owner: string;
}

interface PlayerHPChangedRes {
  id: string;
  difference: number;
}

const HitPointBar = ({ owner }: HitPointBarProps): JSX.Element => {
  const { maxHP } = useGameContext();
  const [hp, setHP] = useState(maxHP);

  const changeHitPoint = ({ id, difference }: PlayerHPChangedRes) => {
    if (id === owner) {
      setHP((currentHP) => currentHP + difference);
    }
  };

  useSocketEvent("player HP changed", changeHitPoint);

  return (
    <div className="hit-point-bar">
      <div className="hit-point-percent" style={{ width: `${(hp * 100) / maxHP}%` }} />
      <div className="hit-point">{hp}</div>
    </div>
  );
};

export default HitPointBar;
