import { css } from "@emotion/react";
import { gridStyle } from "../../../styles";

export const headerStyle = css`
  ${gridStyle};
  box-sizing: border-box;
  grid-template-columns: auto auto;
  position: fixed;
  top: 0;
  padding: 8px;
  width: 100%;
  justify-content: space-between;
`;
