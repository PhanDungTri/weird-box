import React, { useEffect, useRef, useState } from "react";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";
import { GameSettings, HitPointChange } from "../../../../../../shared/src/@types";
import socket from "../../../../services/socket";
import "./HitPointBar.scss";

type HitPointBarProps = {
  id: string;
};

const HitPointBar = ({ id }: HitPointBarProps): JSX.Element => {
  const [hp, setHP] = useState(0);
  const maxHP = useRef(0);

  useEffect(() => {
    socket.on(SOCKET_EVENT.HitPointChanged, (payload: HitPointChange) => {
      if (payload.target === id) setHP(payload.hp);
    });

    socket.once(SOCKET_EVENT.GetGameSettings, (settings: GameSettings) => {
      setHP(settings.maxHP);
      maxHP.current = settings.maxHP;
    });

    return () => void socket.off(SOCKET_EVENT.HitPointChanged);
  }, []);

  return (
    <div className="hit-point">
      <div className="hit-point__bar -underlay" style={{ width: `${(hp * 100) / maxHP.current}%` }} />
      <div className="hit-point__bar" style={{ width: `${(hp * 100) / maxHP.current}%` }} />
      <div className="hit-point__text -centerize">{hp}</div>
    </div>
  );
};

export default HitPointBar;
