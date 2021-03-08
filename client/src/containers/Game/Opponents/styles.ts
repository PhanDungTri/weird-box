import { css, SerializedStyles } from "@emotion/react";
import COLOR from "../../../constants/COLOR";
import { disabledStyle, gridStyle, pixelBorderStyle } from "../../../styles";

export const opponentsStyle = css`
  margin: 4px;
  height: 136px;
  grid-template-columns: repeat(3, 1fr);
`;

export const slotStyle = css`
  ${pixelBorderStyle(4, [COLOR.Coal])};
  position: relative;
  margin: 4px;
`;

export const opponentStyle = (disabled = false): SerializedStyles => css`
  ${gridStyle};
  ${slotStyle}
  grid-template-rows: auto 24px;
  ${disabled && disabledStyle}
`;

export const opponentNameStyle = css`
  background-color: #be6e46;
  color: ${COLOR.White};
  text-align: center;
  padding: 4px;
`;
