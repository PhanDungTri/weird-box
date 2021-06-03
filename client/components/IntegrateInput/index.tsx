import { css } from "@emotion/react";
import { ReactNode, useRef } from "react";
import { StyleVariation } from "../../../shared/@types";
import { InnerButton, InnerInput, StyledIntegratedInput } from "./styles";

type IntegrateInputProps = {
  variation?: StyleVariation;
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
    <StyledIntegratedInput variation={variation}>
      <InnerInput
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        ref={input}
        css={
          disabled &&
          css`
            text-align: center;
          `
        }
      />
      {!disabled && (
        <InnerButton disabled={disabled} ref={button} onClick={submit}>
          {children}
        </InnerButton>
      )}
    </StyledIntegratedInput>
  );
};

export default IntegrateInput;
