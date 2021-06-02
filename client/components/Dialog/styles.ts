import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { StyleVariation } from "../../../shared/@types";
import { COLOR } from "../../constants";
import { autoTextColor, hexToRgb } from "../../utils";
import H1 from "../H1";
import Page from "../Page";

export const StyledDialog = styled(Page)<{ show: boolean }>`
  background-color: rgba(${hexToRgb(COLOR.Normal).join(", ")}, 0.4);
  overflow: auto;
  ${({ show }) =>
    show
      ? css`
          opacity: 1;
          z-index: 1;
          transition: opacity 0.2s;
        `
      : css`
          opacity: 0;
          z-index: -1;
        `}
`;

export const DialogContent = styled.div`
  background-color: ${COLOR.White};
  margin: 25% auto;
  width: 80%;
  color: ${COLOR.Black};
  border: 4px solid;

  & > * {
    padding: 8px;
  }
`;

export const DialogHeader = styled(H1)<{ variation: StyleVariation }>`
  text-transform: uppercase;
  ${({ variation }) => css`
    background-color: ${COLOR[variation]};
    color: ${autoTextColor(COLOR[variation])};
  `}
`;

export const DialogFooter = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;

  & button {
    text-transform: capitalize;
  }
`;
