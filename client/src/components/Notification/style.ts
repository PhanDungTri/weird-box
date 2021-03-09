import { css, SerializedStyles } from "@emotion/react";
import COLOR from "../../constants/COLOR";
import { isDarkColor, shadeColor } from "../../utils/color";

export const notificationStyle = (color: string): SerializedStyles => {
  const borderColor = shadeColor(color, 70);

  return css`
    position: absolute;
    left: 50%;
    width: 70%;
    padding: 8px;
    color: ${isDarkColor(color) ? COLOR.White : COLOR.Black};
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    transition: transform 0.3s;
    box-shadow: 4px 0px 0px 0px ${borderColor}, -4px 0px 0px 0px ${borderColor}, 0px -4px 0px 0px ${borderColor},
      inset 0px -8px 0px 0px ${shadeColor(color, 30)};
    background-color: ${color};
    transform: translate(-50%, 4px);
  `;
};
