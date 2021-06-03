import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { StyleVariation } from "../../../shared/@types";
import { COLOR } from "../../constants";
import { pixelBorderStyle } from "../../styles";
import { shadeColor } from "../../utils";
import Button from "../Button";

export const StyledIntegratedInput = styled.div<{ variation: StyleVariation }>`
  display: flex;
  ${({ variation }) =>
    css`
      ${pixelBorderStyle(2, [shadeColor(COLOR[variation], 70)])}
    `}
`;

export const InnerButton = styled(Button)`
  margin: 2px 2px 2px 0px;
  padding: 2px;
  box-shadow: none;
  margin: 0;
  border: none;
  ${({ variation = "Primary" }) => css`
    border-left: 2px solid ${shadeColor(COLOR[variation], 70)};

    &:active {
      background-color: ${shadeColor(COLOR[variation], 20)};
      border-color: ${shadeColor(COLOR[variation], 70)};
      ${pixelBorderStyle(0, ["#000"])};
    }
  `}
`;

export const InnerInput = styled.input`
  border: none;
  margin: 2px 0px 2px 2px;
  flex-grow: 1;
  padding: 2px;
  cursor: text;
`;
