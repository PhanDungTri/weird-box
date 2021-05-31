import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { COLOR } from "../../../../constants";

export const countdownKeyframes = keyframes`
  from {
    width: calc(100% - 8px);
    background-color: ${COLOR.Safe};
  }

  to {
    width: 0%;
    background-color: ${COLOR.Danger};
  }
`;

export const StyledTimer = styled.div`
  margin: 4px;
  height: 8px;
`;
