import { css, SerializedStyles } from "@emotion/react";
import { pixelBorderStyle } from ".";
import { COLOR } from "../constants";

export const slotStyle = (scale = 1): SerializedStyles => css`
  ${pixelBorderStyle(2 * scale, [COLOR.Normal])};
  position: relative;
`;
