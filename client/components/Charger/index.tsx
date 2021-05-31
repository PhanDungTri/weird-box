import { useCallback, useEffect, useRef, useState } from "react";
import { chargeNodeStyle, emptyNodeStyle, StyledChargePointBar } from "./styles";
import { ChargePointBarState } from "./types";

type ChargerProps = {
  point?: number;
  max: number;
  className?: string;
  onAnimationEnd?: () => void;
};

const charge = (value: number, max: number): boolean[] => {
  const arr: boolean[] = [];
  for (let i = 0; i < max; i++) arr.push(i < value);
  return arr;
};

const Charger = ({ point = 0, max, ...props }: ChargerProps): JSX.Element => {
  const [nodes, setNodeStatus] = useState<boolean[]>(charge(point, max));
  const [barState, setBarState] = useState<ChargePointBarState>("Safe");
  const prevNodes = useRef<boolean[]>(nodes);

  const updateBarState = useCallback(() => {
    if (point < max * 0.5) setBarState("Safe");
    else if (point < max * 0.8) setBarState("Warning");
    else setBarState("Danger");
  }, [point]);

  const renderNodes = () =>
    nodes.map((isCharged, i, arr) => {
      const isIncreased = point >= prevNodes.current.filter(Boolean).length;
      // Triggered on the final node in the transition chain
      const onTransitionEnd =
        (i === 0 && point === 0) || (isIncreased && i === point - 1) || i === point + 1 ? updateBarState : undefined;

      const delay = isCharged === prevNodes.current[i] ? 0 : 0.1 * (isIncreased ? i : arr.length - 1 - i);

      return (
        <div
          css={[chargeNodeStyle(barState, delay), !isCharged && emptyNodeStyle]}
          key={i}
          onTransitionEnd={onTransitionEnd}
        />
      );
    });

  useEffect(() => setNodeStatus(charge(point, max)), [point]);
  useEffect(() => void (prevNodes.current = nodes), [nodes]);

  return <StyledChargePointBar {...props}>{renderNodes()}</StyledChargePointBar>;
};

export default Charger;
