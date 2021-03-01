import { css, keyframes, SerializedStyles } from "@emotion/react";

const spriteAnimation = (sheetWidth: number) => keyframes`
from {
	background-position-x: 0px;
}

to {
	background-position-x: -${sheetWidth}px;
}
`;

const spriteSheetStyle = (steps: number, fps: number, loop: boolean, sheetWidth: number): SerializedStyles => css`
  animation: ${spriteAnimation(sheetWidth)} ${(steps / fps) * 1000}ms steps(${steps}) ${loop ? "infinite" : ""};
`;

export { spriteSheetStyle };
