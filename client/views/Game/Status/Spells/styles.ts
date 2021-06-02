import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { SerializedStyles } from "@emotion/utils";
import { COLOR } from "../../../../constants";

const BADGE_SIZE = 14;

export const StyledSpells = styled.div`
  padding: 4px;
  display: flex;
  gap: 6px;
`;

export const SpellIndicatorBadge = styled.div`
  position: absolute;
  font-size: ${BADGE_SIZE}px;
  background-color: ${COLOR.Normal};
  width: ${BADGE_SIZE}px;
  height: ${BADGE_SIZE}px;
  top: ${BADGE_SIZE}px;
  left: ${BADGE_SIZE}px;
  text-align: center;
  color: ${COLOR.White};
`;

export const spellTriggerAnimation = (trigger = false): SerializedStyles => css`
  position: relative;
  transition: transform 0.2s ease;
  ${trigger &&
  css`
    transform: scale(1.5);
  `}
`;
