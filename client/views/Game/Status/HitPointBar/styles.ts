import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { centerizeStyle } from "../../../../styles";

type HPDiffProps = {
  reverse?: boolean;
};

const hpDiffKeyframes = (reverse = false) => keyframes`
	to {
		top: ${reverse ? -100 : 500}%;
	}
`;

export const HPDiff = styled.div<HPDiffProps>`
  ${centerizeStyle};
  top: ${({ reverse = false }) => (reverse ? 0 : 400)}%;
  font-size: 20px;
  font-weight: bold;
  z-index: 2;
  animation: ${({ reverse = false }) =>
    css`
      ${hpDiffKeyframes(reverse)} 0.8s forwards
    `};
`;
