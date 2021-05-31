import { css, keyframes } from "@emotion/react";

export const cardPlayedKeyframes = keyframes`
	\ 0% {
		top: 100%;
		opacity: 0;
	}

	\ 50% {
		top: 90%;
		opacity: 1;
	}

	\ 100% {
		top: 80%;
		opacity: 0;
	}
`;

export const recentPlayedCard = css`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 6px 12px;
`;
