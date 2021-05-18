import { css } from "@emotion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../../shared/constants";
import { useListenServerEvent } from "../../../../hooks";
import { chargeNodeStyle, chargePointBarDealAnimation, emptyNodeStyle, StyledChargePointBar } from "./styles";
import { ChargePointBarState } from "./types";

const charge = (value: number): boolean[] => {
  const arr: boolean[] = [];
  for (let i = 0; i < 10; i++) arr.push(i < value);
  return arr;
};

const ChargePointBar = (): JSX.Element => {
  const [chargePoint, setChargePoint] = useState(0);
  const [shouldAnimate, animate] = useState(false);
  const [nodes, setNodeStatus] = useState<boolean[]>(charge(0));
  const [barState, setBarState] = useState<ChargePointBarState>("Safe");
  const prevNodes = useRef<boolean[]>(nodes);

  const updateBarState = useCallback(() => {
    if (chargePoint < 5) setBarState("Safe");
    else if (chargePoint >= 5 && chargePoint < 8) setBarState("Warning");
    else setBarState("Danger");
  }, [chargePoint]);

  const stopAnimation = () => animate(false);

  const renderNodes = () =>
    nodes.map((isCharged, i, arr) => {
      const isIncreased = chargePoint >= prevNodes.current.filter(Boolean).length;
      // Triggered on the final node in the transition chain
      const onTransitionEnd =
        (i === 0 && chargePoint === 0) || (isIncreased && i === chargePoint - 1) || i === chargePoint + 1
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

  useEffect(() => setNodeStatus(charge(chargePoint)), [chargePoint]);
  useEffect(() => void (prevNodes.current = nodes), [nodes]);
  useListenServerEvent(SERVER_EVENT_NAME.ChargePointChanged, (point: number) => setChargePoint(point));
  useListenServerEvent(SERVER_EVENT_NAME.GetCards, () => animate(true));

  return (
    <StyledChargePointBar css={shouldAnimate && chargePointBarDealAnimation} onAnimationEnd={stopAnimation}>
      {renderNodes()}
    </StyledChargePointBar>
  );
};

export default ChargePointBar;
