import { css, keyframes, SerializedStyles } from "@emotion/react";
import { TransitionStatus } from "react-transition-group/Transition";

const cardEnterKeyframes = keyframes`
	0% {
    opacity: 0;
    transform: translateY(40px);
    max-width: 0px;
  }

  25% {
    opacity: 0;
    max-width: 4rem;
  }

  100% {
    opacity: 1;
    max-width: 4rem;
    transform: translateY(0px);
  }
`;

const cardExitKeyframes = keyframes`
	0% {
    opacity: 1;
    max-width: 4rem;
  }

  75% {
    opacity: 0;
    max-width: 4rem;
  }

  100% {
    opacity: 0;
    max-width: 0px;
  }
`;

export const cardTransition = (transition: TransitionStatus): SerializedStyles =>
  transition === "entering" || transition === "entered"
    ? css`
        animation: ${cardEnterKeyframes} 0.6s ease-out forwards;
      `
    : css`
        animation: ${cardExitKeyframes} 0.6s forwards;
      `;

export const handStyle = css`
  display: flex;
  margin: 8px;
  gap: 8px;
  justify-content: center;
`;
