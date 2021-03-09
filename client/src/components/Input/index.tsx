import { Interpolation, Theme } from "@emotion/react";
import { inputStyle } from "./style";

const Input = (
  props: React.ClassAttributes<HTMLInputElement> &
    React.InputHTMLAttributes<HTMLInputElement> & {
      css?: Interpolation<Theme>;
    }
): JSX.Element => {
  return (
    <div css={inputStyle}>
      <input {...props} />
    </div>
  );
};

export default Input;
