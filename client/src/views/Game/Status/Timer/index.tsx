import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../../../shared/src/@enums";
import { GameSettings } from "../../../../../../shared/src/@types";
import socket from "../../../../services/socket";
import { useGameContext } from "../../context";
import { countdownBarStyle, countdownTransition } from "./styles";

type TimerProps = {
  id: string;
  fluid?: boolean;
};

const Timer = ({ id, fluid = false }: TimerProps): JSX.Element => {
  const { currentPlayer } = useGameContext();
  const [timePerTurn, setTimePerTurn] = useState(0);

  useEffect(
    () =>
      void socket.once(SOCKET_EVENT.GetGameSettings, (settings: GameSettings) => setTimePerTurn(settings.timePerTurn)),
    []
  );

  return (
    <div
      css={[
        countdownBarStyle(timePerTurn),
        id === currentPlayer && countdownTransition,
        fluid &&
          css`
            grid-column: 1/3;
          `,
      ]}
    />
  );
};

export default Timer;
