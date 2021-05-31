import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const spriteAnimation = (sheetWidth: number) => keyframes`
  from {
    background-position-x: 0px;
  }
  to {
    background-position-x: -${sheetWidth}px;
  }
`;

export const StyledSprite = styled.div`
  position: absolute;
  display: inline-block;
  overflow: hidden;
`;
