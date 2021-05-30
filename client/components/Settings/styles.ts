import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { gridStyle } from "../../styles";

export const toggleStyle = css`
  filter: opacity(20%);
`;

export const optionStyle = css`
  position: relative;
`;

export const AudioSettings = styled.div`
  ${gridStyle};
  gap: 8px;
  grid-template-columns: 3fr 1fr 1fr;
`;
