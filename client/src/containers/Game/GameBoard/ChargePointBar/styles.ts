import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { TransitionStatus } from "react-transition-group/Transition";
import SIZE from "../../../../constants/SIZE";
import { centerizeStyle, gridStyle, pixelBorderStyle } from "../../../../styles";
import { ChargePointBarState } from "./types";

type ChargePointNodeProps = {
  transitionState: TransitionStatus;
  barState: ChargePointBarState;
  delay: number;
};

const nodeBorderColor = "#2e1710";

const chargePointBarColor = {
  safe: ["#99e550", "#6abe30"],
  warning: ["#ffd04c", "#d19c07"],
  danger: ["#ff4412", "#9e371c"],
};

const emptyNodeKeyframes = keyframes`
  from {
    background-color: inherit;
    box-shadow: inherit;
  }
  to {
    background-color: ${nodeBorderColor};
    box-shadow: inset 0px 8px 0px 0px #a79995;
  }
`;

const chargedNodeKeyframes = keyframes`
  from {
    background-color: ${nodeBorderColor};
    box-shadow: inset 0px 8px 0px 0px #a79995;
  }
  to {
    background-color: inherit;
    box-shadow: inherit;
  }
`;

const bouncingKeyframes = keyframes`
  0%, 100% {
    transform: translateX(calc(-50% - 4px));
  }

  10%, 80% {
    transform: translate(calc(-50% - 4px), 6px);
  }

  30% {
    transform: translate(calc(-50% - 4px), 18px);
  }
  
  60%, 90% {
    transform: translate(calc(-50% - 4px), -12px);
  }

  70% {
    transform: translate(calc(-50% - 4px), -24px)
  }
`;

export const ChargePointNode = styled.div<ChargePointNodeProps>`
  transition: background-color 0.5s, box-shadow 0.5s;
  ${({ transitionState, barState }) =>
    transitionState === "entering" || transitionState === "entered"
      ? css`
          background-color: ${chargePointBarColor[barState][0]};
          box-shadow: inset 0px -8px 0px 0px ${chargePointBarColor[barState][1]};
        `
      : css`
          background-color: ${nodeBorderColor};
          box-shadow: inset 0px 8px 0px 0px #a79995;
        `};
  transition-delay: ${({ delay }) => delay}s;
`;

export const StyledChargePointBar = styled.div<{ shouldAnimate: boolean }>`
  ${gridStyle};
  ${centerizeStyle};
  ${pixelBorderStyle(4, ["#ad9587"])};
  width: 105px;
  height: 20px;
  grid-template-columns: repeat(10, 1fr);
  top: calc(50% - ${SIZE.BoxOfCard / 2}px);
  transform: translateX(calc(-50% - 4px));
  border: 4px solid ${nodeBorderColor};
  background-color: ${nodeBorderColor};
  ${({ shouldAnimate }) =>
    shouldAnimate &&
    css`
      animation: ${bouncingKeyframes} ${10 / 12}s steps(1);
    `}
`;
