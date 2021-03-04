import { useEffect, useRef, useState } from "react";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";
import socket from "../../../../services/socket";
import { ChargePointNode, StyledChargePointBar } from "./styles";
import { ChargePointBarState } from "./types";

const charge = (value: number): boolean[] => {
  const arr: boolean[] = [];
  for (let i = 0; i < 10; i++) arr.push(i < value);
  return arr;
};

const ChargePointBar = (): JSX.Element => {
  const [nodes, setNodeStatus] = useState<boolean[]>(charge(0));
  const [state, setState] = useState<ChargePointBarState>("safe");
  const [shouldAnimate, animate] = useState(false);
  const isIncreased = useRef(true);

  const updateChargePoint = (value: number): void => {
    setNodeStatus((list) => {
      isIncreased.current = list.filter(Boolean).length <= value;
      return charge(value);
    });

    if (value < 5) setState("safe");
    else if (value >= 5 && value < 8) setState("warning");
    else setState("danger");
  };

  useEffect(() => {
    socket.on(SOCKET_EVENT.ChargePointChanged, updateChargePoint);
    socket.on(SOCKET_EVENT.TakeCard, () => animate(true));

    return (): void => {
      socket.off(SOCKET_EVENT.ChargePointChanged);
      socket.off(SOCKET_EVENT.TakeCard);
    };
  }, []);

  return (
    <StyledChargePointBar onAnimationEnd={() => animate(false)} shouldAnimate={shouldAnimate}>
      {nodes.map((isCharged, i) => (
        <ChargePointNode
          empty={!isCharged}
          barState={state}
          delay={0.2 * (isIncreased.current ? i : nodes.length - 1 - i)}
          key={i}
        />
      ))}
    </StyledChargePointBar>
  );
};

export default ChargePointBar;
