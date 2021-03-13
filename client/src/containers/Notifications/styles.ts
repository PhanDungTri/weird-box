import { css, SerializedStyles } from "@emotion/react";
import { TransitionStatus } from "react-transition-group/Transition";
import COLOR from "../../constants/COLOR";
import { shadeColor, isDarkColor } from "../../utils/color";

export const notificationStyle = (color: string, state: TransitionStatus, pos: number): SerializedStyles => {
  const borderColor = shadeColor(color, 70);

  return css`
    position: absolute;
    transform: translate(-50%, ${state === "entered" ? `calc(-100% - ${pos * 15}px)` : `4px`});
    width: calc(70% - ${pos * 15}px);
    left: 50%;
    color: ${isDarkColor(color) ? COLOR.White : COLOR.Black};
    text-align: center;
    font-size: 14px;
    padding: 8px;
    font-weight: bold;
    box-shadow: 4px 0px 0px 0px ${borderColor}, -4px 0px 0px 0px ${borderColor}, 0px -4px 0px 0px ${borderColor},
      inset 0px -8px 0px 0px ${shadeColor(color, 30)}, 0px 4px 0px 0px ${borderColor};
    background-color: ${color};
    transition: transform 0.3s, width 0.3s;
  `;
};
