import { css } from "@emotion/react";
import COLOR from "../../../constants/COLOR";
import { gridStyle, headingStyle, slotStyle } from "../../../styles";

export const opponentsStyle = css`
  ${gridStyle};
  margin: 4px;
  height: 120px;
  grid-template-columns: repeat(3, 1fr);
`;

export const opponentStyle = css`
  ${gridStyle};
  ${slotStyle(2)};
  grid-template-rows: auto 24px;
`;

export const opponentNameStyle = css`
  ${headingStyle};
  background-color: #be6e46;
  color: ${COLOR.White};
  text-align: center;
  padding: 4px;
`;
