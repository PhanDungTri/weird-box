import { css, SerializedStyles } from "@emotion/react";
import COLOR from "../../../../constants/COLOR";
import { pixelBorderStyle } from "../../../../styles";
import { shadeColor, tintColor } from "../../../../utils/color";

export const hitPointBarStyle = css`
  position: relative;
  ${pixelBorderStyle(4, [COLOR.Coal])};
  margin: 8px;
  height: 16px;
`;

export const hitPointCapacityStyle = (capacity: number): SerializedStyles => css`
  background-color: ${shadeColor(COLOR.Safe, 20)};
  box-shadow: inset 0px 8px 0px 0px ${tintColor(COLOR.Safe, 20)};
  transition: width 300ms;
  width: ${capacity}%;
  height: 100%;
`;

export const hitPointCapacityUnderlayStyle = css`
  transition-delay: 600ms;
  position: absolute;
  top: 0;
  background-color: ${COLOR.Danger};
  box-shadow: none;
  z-index: -1;
`;
