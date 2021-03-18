import { css } from "@emotion/react";
import { countdownBarStyle, countdownTransition } from "./styles";

type TimerProps = {
  timePerTurn: number;
  fluid?: boolean;
};

const Timer = ({ timePerTurn, fluid = false }: TimerProps): JSX.Element => {
  return (
    <div
      css={[
        countdownBarStyle(timePerTurn),
        countdownTransition,
        fluid &&
          css`
            grid-column: 1/3;
          `,
      ]}
    />
  );
};

export default Timer;
