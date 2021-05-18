import { css } from "@emotion/react";
import { ReactNode, useRef } from "react";
import { StyleVariant } from "../../../@types";
import { disabledStyle } from "../../../styles";
import Button from "../../Button";
import { integrateButtonStyle, integrateInputStyle } from "./styles";

type IntegrateInputProps = {
  variation?: StyleVariant;
  children?: ReactNode;
  onClick?: (value?: string) => void;
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
};

const dummyFn = () => {
  return;
};

const IntegrateInput = ({
  disabled = false,
  placeholder = "",
  defaultValue = "",
  variation = "Primary",
  children = "Enter",
  onClick = dummyFn,
}: IntegrateInputProps): JSX.Element => {
  const button = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);

  const submit = () => onClick(input.current?.value);

  return (
    <div
      css={[
        css`
          display: flex;
        `,
        disabled && disabledStyle,
      ]}
    >
      <input
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        ref={input}
        css={integrateInputStyle(variation)}
      />
      <Button disabled={disabled} ref={button} css={integrateButtonStyle(variation)} onClick={submit}>
        {children}
      </Button>
    </div>
  );
};

export default IntegrateInput;
