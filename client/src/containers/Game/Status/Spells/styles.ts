import { css, keyframes } from "@emotion/react";
import { SerializedStyles } from "@emotion/utils";
import { TransitionStatus } from "react-transition-group/Transition";
import COLOR from "../../../../constants/COLOR";
import { fadeOutKeyframes } from "../../../../styles/keyframes";

const badgeSize = 14;

const spellEnterKeyframes = keyframes`
	0% {
    opacity: 0;
    max-width: 0px;
  }

  25% {
    opacity: 0;
    max-width: 100px;
  }

  100% {
    opacity: 1;
    max-width: 100px;
  }
`;

export const spellTransition = (transition: TransitionStatus): SerializedStyles =>
  transition === "entering" || transition === "entered"
    ? css`
        animation: ${spellEnterKeyframes} 0.4s ease-out forwards;
      `
    : css`
        animation: ${fadeOutKeyframes} 0.4s forwards;
      `;

export const spellsStyle = (align: "center" | "left"): SerializedStyles => css`
  padding: 4px;
  display: flex;
  gap: 6px;
  justify-content: ${align};
`;

export const spellTriggerAnimation = css`
  transition: transform 150ms ease;
  transform: scale(1.5);
`;

export const spellIndicatorBadge = css`
  position: absolute;
  font-size: ${badgeSize}px;
  background-color: ${COLOR.Coal};
  width: ${badgeSize}px;
  height: ${badgeSize}px;
  top: ${badgeSize}px;
  left: ${badgeSize}px;
  text-align: center;
  color: ${COLOR.White};
`;
