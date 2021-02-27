import React, { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";
import { HitPointChange } from "../../../../../../shared/src/@types";
import { useGameContext } from "../../context";
import socket from "../../../../services/socket";
import "./HitPointBar.scss";

type HitPointBarProps = {
  id: string;
};

const HitPointBar = ({ id }: HitPointBarProps): JSX.Element => {
  const { maxHP } = useGameContext();
  const [hp, setHP] = useState(maxHP);

  useEffect(() => {
    socket.on(SOCKET_EVENT.HitPointChanged, (payload: HitPointChange) => {
      if (payload.target === id) setHP(payload.hp);
    });

    return () => void socket.off(SOCKET_EVENT.HitPointChanged);
  }, []);

  useEffect(() => void setHP(maxHP), [maxHP]);

  return (
    <div className="hit-point">
      <div className="hit-point__bar -underlay" style={{ width: `${(hp * 100) / maxHP}%` }} />
      <div className="hit-point__bar" style={{ width: `${(hp * 100) / maxHP}%` }} />
      <div className="hit-point__text -centerize">{hp}</div>
    </div>
  );
};

export default HitPointBar;
