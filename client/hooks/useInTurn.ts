import { useEffect, useState } from "react";
import { SERVER_EVENT_NAME } from "../../shared/@types";
import socket from "../services/socket";

export const useInTurn = (id: string): boolean => {
  const [isInturn, inTurn] = useState(false);

  useEffect(() => {
    const onNewTurn = (target: string) => inTurn(target === id);
    const onPlayCard = () => inTurn(false);

    socket.on(SERVER_EVENT_NAME.NewTurn, onNewTurn);
    socket.on(SERVER_EVENT_NAME.CardPlayed, onPlayCard);

    return () => {
      socket.off(SERVER_EVENT_NAME.NewTurn, onNewTurn);
      socket.off(SERVER_EVENT_NAME.CardPlayed, onPlayCard);
    };
  }, []);

  return isInturn;
};
