import { css } from "@emotion/react";
import { gridStyle, slotStyle } from "../../../../styles";

export const memberListStyle = css`
  ${gridStyle}
  grid-template-columns: repeat(4, 48px);
`;

export const memberStyle = css`
  ${slotStyle()}
  ${gridStyle}
  justify-items: center;
  padding: 4px;
`;

export const keyStyle = css`
  background-color: white;
  top: -14px;
  right: -6px;
`;
