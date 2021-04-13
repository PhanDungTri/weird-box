import { css, keyframes } from "@emotion/react";

const cardPlayedKeyframes = keyframes`
	0% {
		top: 100%;
		opacity: 0;
	}

	50% {
		top: 90%;
		opacity: 1;
	}

	100% {
		top: 80%;
		opacity: 0;
	}
`;

export const cardPlayedAnimation = css`
  animation: ${cardPlayedKeyframes} 1s;
  animation-fill-mode: forwards;
`;
