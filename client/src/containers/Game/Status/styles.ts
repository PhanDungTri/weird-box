import { css } from "@emotion/react";
import { gridStyle } from "../../../styles";

export const statusStyle = css`
  ${gridStyle};
  grid-template-rows: 32px 32px 16px;
`;

export const horizontalStatusStyle = css`
  margin: 8px;
  grid-template-rows: 32px 16px;
  grid-template-columns: 1fr 2fr;
`;
