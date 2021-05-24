import { css } from "@emotion/react";
import { SerializedStyles } from "@emotion/utils";
import { COLOR } from "../../../../constants";

const BADGE_SIZE = 14;

export const spellsStyle = (align: "center" | "left"): SerializedStyles => css`
  padding: 4px;
  display: flex;
  gap: 6px;
  justify-content: ${align};
`;

export const spellTriggerAnimation = css`
  transform: scale(1.5);
`;

export const spellIndicatorBadge = css`
  position: absolute;
  font-size: ${BADGE_SIZE}px;
  background-color: ${COLOR.Coal};
  width: ${BADGE_SIZE}px;
  height: ${BADGE_SIZE}px;
  top: ${BADGE_SIZE}px;
  left: ${BADGE_SIZE}px;
  text-align: center;
  color: ${COLOR.White};
`;
