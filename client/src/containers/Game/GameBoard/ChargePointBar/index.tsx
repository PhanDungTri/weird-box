import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";
import socket from "../../../../services/socket";
import { chargeNodeStyle, chargePointBarDealAnimation, emptyNodeStyle, StyledChargePointBar } from "./styles";
import { ChargePointBarState } from "./types";

const charge = (value: number): boolean[] => {
  const arr: boolean[] = [];
  for (let i = 0; i < 10; i++) arr.push(i < value);
  return arr;
};

const ChargePointBar = (): JSX.Element => {
  const [nodes, setNodeStatus] = useState<boolean[]>(charge(0));
  const [barState, setBarState] = useState<ChargePointBarState>("Safe");
  const [shouldAnimate, animate] = useState(false);
  const prevNodes = useRef<boolean[]>(nodes);

  const updateBarState = () => {
    const value = nodes.filter(Boolean).length;

    if (value < 5) setBarState("Safe");
    else if (value >= 5 && value < 8) setBarState("Warning");
    else setBarState("Danger");
  };

  const renderNodes = () =>
    nodes.map((isCharged, i, arr) => {
      const isIncreased = arr.filter(Boolean).length > prevNodes.current.filter(Boolean).length;
      // Triggered on the final node in the transition chain
      const onTransitionEnd =
        (isIncreased && (i === arr.length - 1 || !arr[i + 1])) || (!isIncreased && (i === 0 || arr[i - 1]))
          ? updateBarState
          : undefined;

      const delay = isCharged === prevNodes.current[i] ? 0 : 0.1 * (isIncreased ? i : arr.length - 1 - i);

      return (
        <div
          css={[
            chargeNodeStyle(barState),
            !isCharged && emptyNodeStyle,
            css`
              transition-delay: ${delay}s;
            `,
          ]}
          key={i}
          onTransitionEnd={onTransitionEnd}
        />
      );
    });

  const updateChargePoint = (value: number) => setNodeStatus(charge(value));

  useEffect(() => void (prevNodes.current = nodes), [nodes]);

  useEffect(() => {
    socket.on(SOCKET_EVENT.ChargePointChanged, updateChargePoint);
    socket.on(SOCKET_EVENT.TakeCard, () => animate(true));

    return () => {
      socket.off(SOCKET_EVENT.ChargePointChanged);
      socket.off(SOCKET_EVENT.TakeCard);
    };
  }, []);

  return (
    <StyledChargePointBar onAnimationEnd={() => animate(false)} css={shouldAnimate && chargePointBarDealAnimation}>
      {renderNodes()}
    </StyledChargePointBar>
  );
};

export default ChargePointBar;
