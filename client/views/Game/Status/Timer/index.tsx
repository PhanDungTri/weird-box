import { css } from "@emotion/react";
import { useInTurn } from "../../../../hooks";
import { countdownBarStyle } from "./styles";

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
        <div
          css={[
            countdownBarStyle(timePerTurn),
            fluid &&
              css`
                grid-column: 1/3;
              `,
          ]}
        />
      )}
    </>
  );
};

export default Timer;
