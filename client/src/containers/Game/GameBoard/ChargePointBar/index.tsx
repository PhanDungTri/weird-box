import { useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";
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
  const [barState, setBarState] = useState<ChargePointBarState>("Danger");
  const [shouldAnimate, animate] = useState(false);
  const [value, setValue] = useState(0);
  const isIncreased = useRef(true);

  const updateBarState = () => {
    if (value < 5) setBarState("Safe");
    else if (value >= 5 && value < 8) setBarState("Warning");
    else setBarState("Danger");
  };

  const renderNodes = () =>
    nodes.map((isCharged, i, arr) => {
      // Triggered on the final node in the transition chain
      const onTransitionEnd =
        (isIncreased.current && (i === arr.length - 1 || !arr[i + 1])) ||
        (!isIncreased.current && (i === 0 || arr[i - 1]))
          ? updateBarState
          : undefined;

      const delay = 0.1 * (isIncreased.current ? i : nodes.length - 1 - i);

      return (
        <Transition in={isCharged} key={i} timeout={200}>
          {(state) => (
            <ChargePointNode
              barState={barState}
              transitionState={state}
              delay={delay}
              onTransitionEnd={onTransitionEnd}
            />
          )}
        </Transition>
      );
    });

  useEffect(() => {
    isIncreased.current = nodes.filter(Boolean).length <= value;
    setNodeStatus(charge(value));
  }, [value]);

  useEffect(() => {
    socket.on(SOCKET_EVENT.ChargePointChanged, setValue);
    socket.on(SOCKET_EVENT.TakeCard, () => animate(true));

    return () => {
      socket.off(SOCKET_EVENT.ChargePointChanged);
      socket.off(SOCKET_EVENT.TakeCard);
    };
  }, []);

  return (
    <StyledChargePointBar onAnimationEnd={() => animate(false)} shouldAnimate={shouldAnimate}>
      {renderNodes()}
    </StyledChargePointBar>
  );
};

export default ChargePointBar;
