import { css } from "@emotion/react";
import { useInTurn } from "../../../../hooks";
import { countdownKeyframes, StyledTimer } from "./styles";

type TimerProps = {
  id: string;
  timePerTurn: number;
  fluid?: boolean;
};

const Timer = ({ id, timePerTurn, fluid = false }: TimerProps): JSX.Element => {
  const shouldShow = useInTurn(id);

  return (
    <>
      {shouldShow && (
        <StyledTimer
          css={[
            fluid &&
              css`
                grid-column: 1/3;
              `,
            css`
              animation: ${countdownKeyframes} ${timePerTurn}ms linear forwards;
            `,
          ]}
        />
      )}
    </>
  );
};

export default Timer;
