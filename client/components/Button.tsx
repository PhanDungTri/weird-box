import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { StyleVariant } from "../../shared/@types";
import { COLOR } from "../constants";
import { pixelBorderStyle } from "../styles";
import { isDarkColor, shadeColor, tintColor } from "../utils";

type ButtonProps = {
  variation?: StyleVariant;
  disabled?: boolean;
};

const Button = styled.button<ButtonProps>`
  ${({ variation = "Primary", disabled = false }) => css`
    ${pixelBorderStyle(2, [shadeColor(COLOR[variation], 70)])};
    background-color: ${COLOR[variation]};
    color: ${isDarkColor(COLOR[variation]) ? COLOR.White : COLOR.Black};
    border: 2px solid ${COLOR[variation]};
    border-style: solid none;

    &:hover {
      border-bottom-color: ${disabled ? COLOR[variation] : "rgba(0, 0, 0, 0.4)"};
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
