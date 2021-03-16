import { css, keyframes, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import COLOR from "../../../../constants/COLOR";
import SIZE from "../../../../constants/SIZE";
import { centerizeStyle, gridStyle, pixelBorderStyle } from "../../../../styles";
import { shadeColor } from "../../../../utils/color";
import { ChargePointBarState } from "./types";

const nodeBorderColor = "#2e1710";

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

export const emptyNodeStyle = css`
  background-color: ${nodeBorderColor};
  box-shadow: inset 0px 8px 0px 0px #a79995;
`;

export const chargeNodeStyle = (barState: ChargePointBarState): SerializedStyles => css`
  transition: background-color 0.2s, box-shadow 0.2s;
  background-color: ${COLOR[barState]};
  box-shadow: inset 0px -8px 0px 0px ${shadeColor(COLOR[barState], 30)};
`;

export const chargePointBarDealAnimation = css`
  animation: ${bouncingKeyframes} ${10 / 12}s steps(1);
`;

export const StyledChargePointBar = styled.div`
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
`;
