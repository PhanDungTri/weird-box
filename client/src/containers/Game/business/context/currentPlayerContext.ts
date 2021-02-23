import { useEffect, useState } from "react";
import SOCKET_EVENT from "../../../../../../shared/src/SocketEvent";
import socket from "../../../../services/socket";

interface CurrentPlayerHook {
  currentPlayer: string;
  finishTurn: () => void;
}

const useCurrentPlayer = (): CurrentPlayerHook => {
  const [currentPlayer, setCurrentPlayer] = useState("");

  useEffect(() => {
    socket.on(SOCKET_EVENT.StartTurn, (id: string) => setCurrentPlayer(id));

    return (): void => {
      socket.off(SOCKET_EVENT.StartTurn);
    };
  }, []);

  const finishTurn = (): void => setCurrentPlayer("");

  return { currentPlayer, finishTurn };
};

export default useCurrentPlayer;
