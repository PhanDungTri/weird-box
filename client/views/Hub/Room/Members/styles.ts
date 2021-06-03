import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Grid from "../../../../components/Grid";
import { slotStyle } from "../../../../styles";

export const StyledMembers = styled(Grid)`
  grid-template-columns: repeat(4, 75px);
`;

export const StyledMember = styled(Grid)`
  ${slotStyle()}
  justify-items: center;
  padding: 4px;
`;

export const MemberName = styled.div`
  font-size: 12px;
  text-align: center;
  word-break: break-all;
`;

export const keyStyle = css`
  background-color: white;
  top: -14px;
  right: -6px;
`;
