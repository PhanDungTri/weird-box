import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { centerizeStyle } from "../../../../styles";

const hpDiffKeyframes = (goUp = false) => keyframes`
	to {
		top: ${goUp ? -100 : 500}%;
	}
`;

export const HPDiff = styled.div<{ goUp?: boolean }>`
  ${centerizeStyle};
  top: ${({ goUp = false }) => (goUp ? 0 : 400)}%;
  font-size: 14px;
  font-weight: bold;
  z-index: 2;
  animation: ${({ goUp = false }) =>
    css`
      ${hpDiffKeyframes(goUp)} 0.8s forwards
    `};
`;
