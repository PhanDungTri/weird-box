import { css, SerializedStyles } from "@emotion/react";
import { TransitionStatus } from "react-transition-group/Transition";
import COLOR from "../../constants/COLOR";
import { shadeColor, isDarkColor } from "../../utils/color";

export const notificationStyle = (color: string, state: TransitionStatus): SerializedStyles => {
  const borderColor = shadeColor(color, 70);

  return css`
    opacity: ${state === "entered" || state === "entering" ? 1 : 0};
    left: 50%;
    color: ${isDarkColor(color) ? COLOR.White : COLOR.Black};
    text-align: center;
    font-size: 14px;
    padding: 8px;
    font-weight: bold;
    box-shadow: 4px 0px 0px 0px ${borderColor}, -4px 0px 0px 0px ${borderColor}, 0px -4px 0px 0px ${borderColor},
      inset 0px -8px 0px 0px ${shadeColor(color, 30)};
    background-color: ${color};
    transition: opacity 0.3s;
  `;
};
