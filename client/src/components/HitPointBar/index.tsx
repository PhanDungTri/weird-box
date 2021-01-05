import React, { useEffect, useState } from "react";
import "./HitPointBar.scss";

interface HitPointBarProps {
  hp: number;
  maxHP: number;
}

const HitPointBar = ({ hp, maxHP }: HitPointBarProps): JSX.Element => {
  const [delayHP, setDelayHP] = useState(hp);

  useEffect(() => {
    const timeout = setTimeout(() => setDelayHP(hp), 600);

    return (): void => {
      clearTimeout(timeout);
    };
  }, [hp]);

  return (
    <div className="hit-point">
      <div className="hit-point__bar -delay" style={{ width: `${(delayHP * 100) / maxHP}%` }} />
      <div className="hit-point__bar" style={{ width: `${(hp * 100) / maxHP}%` }} />
      <div className="hit-point__text -centerize">{hp}</div>
    </div>
  );
};

export default HitPointBar;
