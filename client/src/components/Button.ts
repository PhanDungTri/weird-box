import { css } from "@emotion/react";
import styled from "@emotion/styled";
import COLOR from "../constants/COLOR";
import { pixelBorderStyle } from "../styles";
import { isDarkColor, shadeColor, tintColor } from "../utils/color";

type ButtonVariation = "Safe" | "Danger" | "Warning" | "Primary";

type ButtonProps = {
  variation?: ButtonVariation;
};

const Button = styled.button<ButtonProps>`
  ${({ variation = "Primary" }) => css`
    ${pixelBorderStyle(2, [shadeColor(COLOR[variation], 70)])};
    background-color: ${COLOR[variation]};
    color: ${isDarkColor(COLOR[variation]) ? COLOR.White : COLOR.Black};
    border: 2px solid ${COLOR[variation]};
    border-style: solid none;

    &:hover {
      border-bottom-color: rgba(0, 0, 0, 0.4);
    }

    &:active {
      background-color: ${tintColor(COLOR[variation], 25)};
      border-color: ${tintColor(COLOR[variation], 25)};
    }
  `}
  outline: none;
  cursor: pointer;
  padding: 0px 6px;
`;

export default Button;
