import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Grid from "../../../../components/Grid";

export const toggleStyle = css`
  filter: opacity(20%);
`;

export const PartialSettings = styled(Grid)`
  gap: 8px;
  grid-template-columns: 3fr 1fr 1fr;
  align-items: center;
`;
