import React, { useEffect, useState } from "react";
import "./ChargePointBar.scss";

interface ChargePointProps {
  value: number;
}

type ChargePointBarState = "safe" | "warning" | "danger";

const charge = (value: number): boolean[] => {
  const arr: boolean[] = [];

  for (let i = 0; i < 10; i++) {
    arr.push(i < value);
  }

  return arr;
};

const ChargePointBar = ({ value }: ChargePointProps): JSX.Element => {
  const [nodes, setNodeStatus] = useState<boolean[]>(charge(value));
  const [state, setState] = useState<ChargePointBarState>("safe");

  useEffect(() => {
    setNodeStatus(charge(value));

    if (value < 5) setState("safe");
    else if (value >= 5 && value < 8) setState("warning");
    else setState("danger");
  }, [value]);

  return (
    <div className={`charge-point-bar ${state}`}>
      {nodes.map((isCharged, i) => (
        <div className={`charge-point ${!isCharged ? "empty" : ""}`} key={i} />
      ))}
    </div>
  );
};

export default ChargePointBar;
