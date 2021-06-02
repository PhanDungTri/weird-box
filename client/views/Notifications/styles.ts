import { css, SerializedStyles } from "@emotion/react";
import { StyleVariation } from "../../../shared/@types";
import { COLOR } from "../../constants";
import { autoTextColor, shadeColor } from "../../utils";

export const notificationStyle = (variation: StyleVariation, pos: number): SerializedStyles => {
  const borderColor = shadeColor(COLOR[variation], 70);

  return css`
    position: absolute;
    width: calc(70% - ${pos * 15}px);
    max-width: calc(420px - ${pos * 15}px);
    left: 50%;
    top: -${pos * 15}px;
    color: ${autoTextColor(COLOR[variation])};
    text-align: center;
    padding: 8px;
    font-size: 14px;
    box-shadow: 4px 0px 0px 0px ${borderColor}, -4px 0px 0px 0px ${borderColor}, 0px -4px 0px 0px ${borderColor},
      inset 0px -8px 0px 0px ${shadeColor(COLOR[variation], 30)};
    background-color: ${COLOR[variation]};
    transition: width 0.2s, top 0.2s;
  `;
};
