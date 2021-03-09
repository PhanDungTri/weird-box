import { css } from "@emotion/react";
import COLOR from "../../../constants/COLOR";
import { pixelBorderStyle } from "../../../styles";

export const opponentsStyle = css`
  margin: 4px;
  height: 120px;
  grid-template-columns: repeat(3, 1fr);
`;

export const slotStyle = css`
  ${pixelBorderStyle(4, [COLOR.Coal])};
  position: relative;
  margin: 4px;
`;

export const opponentStyle = css`
  ${slotStyle}
  grid-template-rows: auto 24px;
`;

export const opponentNameStyle = css`
  background-color: #be6e46;
  color: ${COLOR.White};
  text-align: center;
  padding: 4px;
`;
