import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { StyleVariation } from "../../../shared/@types";
import { COLOR } from "../../constants";
import { shadeColor } from "../../utils";
import Button from "../Button";

export const StyledIntegrateButton = styled(Button)`
  margin: 2px 2px 2px 0px;
  padding: 2px;
  ${({ variation = "Primary" }) => {
    const borderColor = shadeColor(COLOR[variation], 70);

    return css`
      box-shadow: -1px 1px 0px 1px ${borderColor}, 2px 0px ${borderColor}, -1px -1px 0px 1px ${borderColor};
    `;
  }}
`;

export const StyledIntegrateInput = styled.input<{ variation: StyleVariation }>`
  border: none;
  margin: 2px 0px 2px 2px;
  flex-grow: 1;
  padding: 2px;
  cursor: text;
  ${({ variation }) => {
    const borderColor = shadeColor(COLOR[variation], 70);

    return css`
      box-shadow: 1px 1px 0px 1px ${borderColor}, -2px 0px ${borderColor}, 1px -1px 0px 1px ${borderColor};
    `;
  }}
`;
