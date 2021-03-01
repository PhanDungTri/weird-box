import { useEffect, useState } from "react";
import socket from "../../../../services/socket";
import useStepAnimation from "../../../../hooks/useStepAnimation";
import "./ChargePointBar.scss";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";

type ChargePointBarState = "safe" | "warning" | "danger";

const charge = (value: number): boolean[] => {
  const arr: boolean[] = [];

  for (let i = 0; i < 10; i++) {
    arr.push(i < value);
  }

  return arr;
};

// Animation keyframes.
const offset = [0, 4, 4, 16, 16, 16, -12, -20, 4, 0];

const ChargePointBar = (): JSX.Element => {
  const [value, setValue] = useState(0);
  const [nodes, setNodeStatus] = useState<boolean[]>(charge(value));
  const [state, setState] = useState<ChargePointBarState>("safe");
  const { currentStep, animate } = useStepAnimation({ step: offset.length, tick: 3, repeat: 0, start: false });

  // Moving up and down when the box of card does the dealing job.
  const dealCard = (): void => {
    animate(true);
  };

  const updateChargePoint = (point: number): void => {
    setValue(point);
  };

  useEffect(() => {
    setNodeStatus(charge(value));

    if (value < 5) setState("safe");
    else if (value >= 5 && value < 8) setState("warning");
    else setState("danger");
  }, [value]);

  useEffect(() => {
    socket.on(SOCKET_EVENT.ChargePointChanged, updateChargePoint);
    socket.on(SOCKET_EVENT.TakeCard, dealCard);

    return (): void => {
      socket.off(SOCKET_EVENT.ChargePointChanged);
      socket.off(SOCKET_EVENT.TakeCard);
    };
  }, []);

  return (
    <div
      className={`charge-point -${state}`}
      style={{
        transform: `translate(calc(-50% - 8px), ${offset[currentStep]}px)`,
      }}
    >
      {nodes.map((isCharged, i) => (
        <div className={`charge-point__node ${!isCharged ? "-empty" : ""}`} key={i} />
      ))}
    </div>
  );
};

export default ChargePointBar;
