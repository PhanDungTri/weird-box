import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Grid from "../Grid";

export const toggleStyle = css`
  filter: opacity(20%);
`;

export const optionStyle = css`
  position: relative;
`;

export const AudioSettings = styled(Grid)`
  gap: 8px;
  grid-template-columns: 3fr 1fr 1fr;
`;
