import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Grid from "../../../components/Grid";

export const StyledStatus = styled(Grid)`
  box-sizing: border-box;
  grid-template-rows: 32px 32px 16px;
`;

export const horizontalStatusStyle = css`
  margin: 8px;
  grid-template-rows: 32px 16px;
  grid-template-columns: 1fr 2fr 24px;
`;
