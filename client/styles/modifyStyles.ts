import { css } from "@emotion/react";

export const centerizeStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const centerizeContainerStyle = css`
  justify-content: center;
  justify-items: center;
  align-content: center;
`;

export const disabledStyle = css`
  filter: grayscale(100%);
`;
