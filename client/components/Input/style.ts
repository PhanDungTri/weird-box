import { css } from "@emotion/react";
import { COLOR } from "../../constants";

export const inputStyle = css`
  display: flex;
  border-bottom: 2px solid ${COLOR.Coal};
  margin: 2px;

  & > input {
    border: none;
    outline: none;
    flex-grow: 1;
  }

  &::before {
    content: ">";
    padding: 2px;
    font-weight: bold;
  }
`;
