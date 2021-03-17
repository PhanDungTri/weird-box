import { css, SerializedStyles } from "@emotion/react";
import COLOR from "../../constants/COLOR";
import { isDarkColor, shadeColor } from "../../utils/color";

export const notificationStyle = (color: string, pos: number): SerializedStyles => {
  const borderColor = shadeColor(color, 70);

  return css`
    position: absolute;
    width: calc(70% - ${pos * 15}px);
    left: 50%;
    top: -${pos * 15}px;
    color: ${isDarkColor(color) ? COLOR.White : COLOR.Black};
    text-align: center;
    font-size: 14px;
    padding: 8px;
    font-weight: bold;
    box-shadow: 4px 0px 0px 0px ${borderColor}, -4px 0px 0px 0px ${borderColor}, 0px -4px 0px 0px ${borderColor},
      inset 0px -8px 0px 0px ${shadeColor(color, 30)};
    background-color: ${color};
    transition: width 0.2s, top 0.2s;
  `;
};
