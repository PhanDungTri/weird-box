import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { COLOR } from "../../constants";
import { pixelBorderStyle } from "../../styles";
import { shadeColor } from "../../utils";
import Grid from "../Grid";
import { ChargePointBarState } from "./types";

const NODE_BORDER_COLOR = "#2e1710";

export const emptyNodeStyle = css`
  background-color: ${NODE_BORDER_COLOR};
  box-shadow: inset 0px 8px 0px 0px #a79995;
`;

export const chargeNodeStyle = (barState: ChargePointBarState, delay: number): SerializedStyles => css`
  transition: background-color 0.2s, box-shadow 0.2s;
  background-color: ${COLOR[barState]};
  box-shadow: inset 0px -8px 0px 0px ${shadeColor(COLOR[barState], 30)};
  transition-delay: ${delay}s;
`;

export const StyledChargePointBar = styled(Grid)`
  ${pixelBorderStyle(4, ["#ad9587"])};
  width: 105px;
  height: 20px;
  grid-template-columns: repeat(10, 1fr);
  border: 4px solid ${NODE_BORDER_COLOR};
  background-color: ${NODE_BORDER_COLOR};
`;
