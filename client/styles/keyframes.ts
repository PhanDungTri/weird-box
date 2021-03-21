import { keyframes } from "@emotion/react";

export const fadeOutKeyframes = keyframes`
	0% {
		opacity: 1;
		max-width: 100px;
	}

	75% {
		opacity: 0;
		max-width: 100px;
	}

	100% {
		opacity: 0;
		max-width: 0px;
	}
`;
