import { ReactNode } from "react";
import { centerizeStyle } from "../../styles";
import { ProgressBarCurrentValue, ProgressBarUnderlayValue, StyledProgressBar } from "./styles";

type ProgressBarProps = {
  max?: number;
  current?: number;
  suffix?: ReactNode;
  className?: string;
};

const ProgressBar = ({ max = 100, current = 0, suffix = "", ...props }: ProgressBarProps): JSX.Element => {
  return (
    <StyledProgressBar {...props}>
      <ProgressBarUnderlayValue css={{ width: `${(current * 100) / max}%` }} />
      <ProgressBarCurrentValue css={{ width: `${(current * 100) / max}%` }} />
      <div css={[{ fontWeight: "bold" }, centerizeStyle]}>
        {current}&nbsp;{suffix}
      </div>
    </StyledProgressBar>
  );
};

export default ProgressBar;
