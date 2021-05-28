import { css } from "@emotion/react";
import { ReactNode } from "react";
import { centerizeStyle } from "../../styles";
import { currentValueStyle, currentValueUnderlayStyle, progressBarStyle } from "./styles";

type ProgressBarProps = {
  max?: number;
  current?: number;
  suffix?: ReactNode;
  className?: string;
};

const ProgressBar = ({ max = 100, current = 0, suffix = "", ...props }: ProgressBarProps): JSX.Element => {
  return (
    <div css={progressBarStyle} {...props}>
      <div css={[currentValueStyle((current * 100) / max), currentValueUnderlayStyle]} />
      <div css={currentValueStyle((current * 100) / max)} />
      <div
        css={[
          css`
            font-weight: bold;
          `,
          centerizeStyle,
        ]}
      >
        {current}&nbsp;{suffix}
      </div>
    </div>
  );
};

export default ProgressBar;
