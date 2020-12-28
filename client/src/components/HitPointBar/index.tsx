import React, { useState } from "react";
import SOCKET_EVENT from "../../../../shared/src/socketEvent";
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
  const [helperHP, setHelperHP] = useState(hp);

  const changeHitPoint = ({ id, difference }: PlayerHPChangedRes) => {
    if (id === owner) {
      setHP((currentHP) => {
        const newHP = currentHP + difference;

        if (newHP < 0) return 0;
        if (newHP > 100) return 100;

        setTimeout(() => setHelperHP(newHP), 600);

        return newHP;
      });
    }
  };

  useSocketEvent(SOCKET_EVENT.HitPointChanged, changeHitPoint);

  return (
    <div className="hit-point-bar">
      <div className="hit-point-percent helper" style={{ width: `${(helperHP * 100) / maxHP}%` }} />
      <div className="hit-point-percent" style={{ width: `${(hp * 100) / maxHP}%` }} />
      <div className="hit-point">{hp}</div>
    </div>
  );
};

export default HitPointBar;
