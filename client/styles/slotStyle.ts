import { css, SerializedStyles } from "@emotion/react";
import { pixelBorderStyle } from ".";
import COLOR from "../constants/COLOR";

export const slotStyle = (scale = 1): SerializedStyles => css`
  ${pixelBorderStyle(2 * scale, [COLOR.Coal])};
  position: relative;
`;
