import { css } from "@emotion/react";

export const centerizeStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const xCenterStyle = css`
  left: 50%;
  transform: translateX(-50%);
`;

export const disabledStyle = css`
  filter: grayscale(100%);
`;

export const clickableIconStyle = css`
  position: relative;
  cursor: pointer;
`;
