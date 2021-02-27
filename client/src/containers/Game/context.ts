import constate from "constate";
import { useEffect, useState } from "react";
import { SOCKET_EVENT } from "../../../../shared/src/@enums";
import socket from "../../services/socket";

const [GameContextProvider, useGameContext] = constate(() => {
  const [currentPlayer, setCurrentPlayer] = useState("");

  useEffect(() => {
    socket.on(SOCKET_EVENT.StartTurn, (id: string) => setCurrentPlayer(id));

    return (): void => {
      socket.off(SOCKET_EVENT.StartTurn);
    };
  }, []);

  const finishTurn = (): void => setCurrentPlayer("");

  return { currentPlayer, finishTurn };
});

export { GameContextProvider, useGameContext };
