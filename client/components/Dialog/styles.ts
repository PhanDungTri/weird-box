import { css, SerializedStyles } from "@emotion/react";
import COLOR from "../../constants/COLOR";
import { headingStyle, pageStyle } from "../../styles";
import { hexToRgb, isDarkColor } from "../../utils/color";

export const showDialogStyle = css`
  opacity: 1;
  z-index: 1;
  transition: opacity 0.2s;
`;

export const dialogStyle = css`
  ${pageStyle};
  background-color: rgba(${hexToRgb(COLOR.Coal).join(", ")}, 0.4);
  overflow: auto;
  opacity: 0;
  z-index: -1;
`;

export const dialogContentStyle = (borderColor: string): SerializedStyles => css`
  background-color: ${COLOR.White};
  border: 4px solid ${borderColor};
  margin: 25vh auto;
  width: 80%;
  color: ${COLOR.Black};

  & > * {
    padding: 8px;
  }
`;

export const dialogHeaderStyle = (color: string): SerializedStyles => css`
  ${headingStyle};
  background-color: ${color};
  color: ${isDarkColor(color) ? COLOR.White : COLOR.Black};
  text-transform: uppercase;
`;

export const dialogFooterStyle = css`
  display: flex;
  gap: 8px;
  justify-content: flex-end;

  & button {
    text-transform: capitalize;
  }
`;
