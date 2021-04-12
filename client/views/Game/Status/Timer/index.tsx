import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { SERVER_EVENT_NAME } from "../../../../../shared/@types";
import socket from "../../../../services/socket";
import { countdownBarStyle } from "./styles";

type TimerProps = {
  id: string;
  timePerTurn: number;
  fluid?: boolean;
};

const Timer = ({ id, timePerTurn, fluid = false }: TimerProps): JSX.Element => {
  const [shouldShow, show] = useState(false);

  useEffect(() => {
    const onNewTurn = (target: string) => show(target === id);
    socket.on(SERVER_EVENT_NAME.NewTurn, onNewTurn);
    return () => void socket.off(SERVER_EVENT_NAME.NewTurn, onNewTurn);
  });

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
