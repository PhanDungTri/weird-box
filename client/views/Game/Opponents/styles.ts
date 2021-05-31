import styled from "@emotion/styled";
import Grid from "../../../components/Grid";
import H1 from "../../../components/H1";
import { slotStyle } from "../../../styles";

export const StyledOpponents = styled(Grid)`
  margin: 4px;
  height: 120px;
  grid-template-columns: repeat(3, 1fr);
`;

export const StyledOpponent = styled(Grid)`
  ${slotStyle(2)};
  grid-template-rows: auto 24px;
`;

export const OpponentName = styled(H1)`
  background-color: #be6e46;
  text-align: center;
  padding: 4px;
`;
