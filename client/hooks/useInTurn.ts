import { useEffect, useState } from "react";
import { CardInfo, SERVER_EVENT_NAME } from "../../shared/@types";
import socket from "../services/socket";

export const useInTurn = (id: string): boolean => {
  const [isInturn, inTurn] = useState(false);

  useEffect(() => {
    const onNewTurn = (target: string) => inTurn(target === id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onPlayCard = (_: CardInfo) => inTurn(false);

    socket.on(SERVER_EVENT_NAME.NewTurn, onNewTurn);
    socket.on(SERVER_EVENT_NAME.CardPlayed, onPlayCard);

    return () => {
      socket.off(SERVER_EVENT_NAME.NewTurn, onNewTurn);
      socket.off(SERVER_EVENT_NAME.CardPlayed, onPlayCard);
    };
  }, []);

  return isInturn;
};
