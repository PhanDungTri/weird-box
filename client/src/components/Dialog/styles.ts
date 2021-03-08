import { css, SerializedStyles } from "@emotion/react";
import { TransitionStatus } from "react-transition-group/Transition";
import COLOR from "../../constants/COLOR";
import { hexToRgb, isDarkColor } from "../../utils/color";

export const dialogStyle = (transitionState: TransitionStatus): SerializedStyles => css`
  z-index: 1;
  background-color: rgba(${hexToRgb(COLOR.Coal).join(", ")}, 0.4);
  overflow: auto;
  ${transitionState === "entered" || transitionState === "entering"
    ? css`
        opacity: 1;
        z-index: 1;
        backdrop-filter: blur(2px);
      `
    : css`
        opacity: 0;
        z-index: -1;
      `}
  transition: opacity 0.2s, backdrop-filter 0.2s;
`;

export const dialogContentStyle = (borderColor: string): SerializedStyles => css`
  background-color: ${COLOR.White};
  border: 4px solid ${borderColor};
  margin: 25vh auto;
  width: 80%;
  color: ${COLOR.Black};

  & > * {
    padding: 8px;
  }
`;

export const dialogHeaderStyle = (color: string): SerializedStyles => css`
  background-color: ${color};
  color: ${isDarkColor(color) ? COLOR.White : COLOR.Black};
  text-transform: uppercase;
`;

export const dialogFooterStyle = css`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;
