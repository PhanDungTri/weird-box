import { ReactNode, useRef } from "react";
import { StyleVariation } from "../../../shared/@types";
import { disabledStyle } from "../../styles";
import { StyledIntegrateButton, StyledIntegrateInput } from "./styles";

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
    <div css={[{ display: "flex" }, disabled && disabledStyle]}>
      <StyledIntegrateInput
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={defaultValue}
        ref={input}
        variation={variation}
      />
      <StyledIntegrateButton disabled={disabled} ref={button} onClick={submit}>
        {children}
      </StyledIntegrateButton>
    </div>
  );
};

export default IntegrateInput;
