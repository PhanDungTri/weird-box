import { css, keyframes } from "@emotion/react";
import { centerizeStyle } from "../../../../../styles";
import { BOX_OF_CARD_SIZE } from "../constants";

export const bouncingKeyframes = keyframes`
  \ 0%, \ 100% {
    transform: translateX(calc(-50% - 4px));
  }

  \ 10%, \ 80% {
    transform: translate(calc(-50% - 4px), 6px);
  }

  \ 30% {
    transform: translate(calc(-50% - 4px), 18px);
  }
  
  \ 60%, \ 90% {
    transform: translate(calc(-50% - 4px), -12px);
  }

  \ 70% {
    transform: translate(calc(-50% - 4px), -24px)
  }
`;

export const chargePointBarStyle = css`
  ${centerizeStyle};
  top: calc(50% - ${BOX_OF_CARD_SIZE / 2}px);
  transform: translateX(calc(-50% - 4px));
`;
