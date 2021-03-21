import { css } from "@emotion/react";
import { SerializedStyles } from "@emotion/utils";
import COLOR from "../../../../constants/COLOR";

const badgeSize = 14;

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
  font-size: ${badgeSize}px;
  background-color: ${COLOR.Coal};
  width: ${badgeSize}px;
  height: ${badgeSize}px;
  top: ${badgeSize}px;
  left: ${badgeSize}px;
  text-align: center;
  color: ${COLOR.White};
`;
