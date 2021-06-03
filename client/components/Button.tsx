import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { StyleVariation } from "../../shared/@types";
import { COLOR } from "../constants";
import { pixelBorderStyle } from "../styles";
import { autoTextColor, shadeColor, tintColor } from "../utils";

type ButtonProps = {
  variation?: StyleVariation;
  disabled?: boolean;
};

const Button = styled.button<ButtonProps>`
  ${({ variation = "Primary", disabled = false }) => css`
    ${pixelBorderStyle(2, [shadeColor(COLOR[variation], 70)])};
    background-color: ${COLOR[variation]};
    color: ${autoTextColor(COLOR[variation])};
    border: 2px solid ${COLOR[variation]};
    border-style: solid none;
    cursor: ${disabled ? "initial" : "pointer"};

    &:hover {
      border-bottom-color: ${disabled ? COLOR[variation] : "rgba(0, 0, 0, 0.4)"};
    }

    &:active {
      background-color: ${tintColor(COLOR[variation], 25)};
      border-color: ${tintColor(COLOR[variation], 25)};
      ${pixelBorderStyle(2, [shadeColor(COLOR[variation], 50)])};
    }
  `}
  outline: none;
  padding: 0px 6px;
`;

export default Button;
