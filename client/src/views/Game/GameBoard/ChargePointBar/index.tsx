import { css } from "@emotion/react";
import { useEffect, useRef, useState } from "react";
import { useBoxOfCardState } from "../../../../hooks/useStore";
import { chargeNodeStyle, chargePointBarDealAnimation, emptyNodeStyle, StyledChargePointBar } from "./styles";
import { ChargePointBarState } from "./types";

const charge = (value: number): boolean[] => {
  const arr: boolean[] = [];
  for (let i = 0; i < 10; i++) arr.push(i < value);
  return arr;
};

const ChargePointBar = (): JSX.Element => {
  const chargePoint = useBoxOfCardState((state) => state.chargePoint);
  const boxOfCardStatus = useBoxOfCardState((state) => state.status);
  const [nodes, setNodeStatus] = useState<boolean[]>(charge(0));
  const [barState, setBarState] = useState<ChargePointBarState>("Safe");
  const prevNodes = useRef<boolean[]>(nodes);

  const updateBarState = () => {
    if (chargePoint < 5) setBarState("Safe");
    else if (chargePoint >= 5 && chargePoint < 8) setBarState("Warning");
    else setBarState("Danger");
  };

  const renderNodes = () =>
    nodes.map((isCharged, i, arr) => {
      const isIncreased = chargePoint > prevNodes.current.filter(Boolean).length;
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

  useEffect(() => setNodeStatus(charge(chargePoint)), [chargePoint]);
  useEffect(() => void (prevNodes.current = nodes), [nodes]);

  return (
    <StyledChargePointBar css={boxOfCardStatus === "deal" && chargePointBarDealAnimation}>
      {renderNodes()}
    </StyledChargePointBar>
  );
};

export default ChargePointBar;
