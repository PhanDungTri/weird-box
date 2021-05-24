import { css, keyframes, SerializedStyles } from "@emotion/react";
import { COLOR } from "../../../../constants";

const countdownKeyframes = keyframes`
  from {
    width: calc(100% - 8px);
    background-color: ${COLOR.Safe};
  }

  to {
    width: 0%;
    background-color: ${COLOR.Danger};
  }
`;

export const countdownBarStyle = (duration: number): SerializedStyles => css`
  margin: 4px;
  height: 8px;
  animation: ${countdownKeyframes} ${duration}ms linear forwards;
`;
