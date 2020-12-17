import React, { useEffect, useState } from "react";
import ANIMATION_DURATION from "../../../../../../shared/animationDuration";
import useSocketEvent from "../../../../hooks/useSocketEvent";
import useStepAnimation from "../../../../hooks/useStepAnimation";
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

const offset = [0, 4, 4, 16, 16, 16, -12, -20, 4, 0];

const ChargePointBar = ({ value }: ChargePointProps): JSX.Element => {
  const [nodes, setNodeStatus] = useState<boolean[]>(charge(value));
  const [state, setState] = useState<ChargePointBarState>("safe");
  const { currentStep, animate } = useStepAnimation({ step: offset.length, tick: 3, repeat: 0, start: false });

  const dealCard = (): void => {
    animate(true);
    setTimeout(() => animate(false), ANIMATION_DURATION.DealCard);
  };

  useSocketEvent("take card", dealCard);

  useEffect(() => {
    setNodeStatus(charge(value));

    if (value < 5) setState("safe");
    else if (value >= 5 && value < 8) setState("warning");
    else setState("danger");
  }, [value]);

  return (
    <div
      className={`charge-point-bar ${state}`}
      style={{
        transform: `translate(calc(-50% - 8px), ${offset[currentStep]}px)`,
      }}
    >
      {nodes.map((isCharged, i) => (
        <div className={`charge-point ${!isCharged ? "empty" : ""}`} key={i} />
      ))}
    </div>
  );
};

export default ChargePointBar;
