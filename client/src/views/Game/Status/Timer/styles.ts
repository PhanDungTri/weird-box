import { css, SerializedStyles } from "@emotion/react";
import COLOR from "../../../../constants/COLOR";

export const countdownBarStyle = (duration: number): SerializedStyles => css`
  margin: 4px;
  height: 8px;
  width: calc(100% - 8px);
  background-color: ${COLOR.Safe};
  transition: opacity 0.1s;
  opacity: 0;
  transition: width ${duration}ms 0.1s, background-color ${duration}ms 0.1s, opacity 0.1s;
`;

export const countdownTransition = css`
  width: 0%;
  opacity: 1;
  background-color: ${COLOR.Danger};
  transition-timing-function: linear;
`;
