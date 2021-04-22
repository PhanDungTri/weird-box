import { useEffect, useState } from "react";
import { SERVER_EVENT_NAME } from "../../shared/constants";
import socket from "../services/socket";
import { useListenServerEvent } from "./useListenServerEvent";

export const useInTurn = (id: string): boolean => {
  const [isInturn, inTurn] = useState(false);

  useListenServerEvent(SERVER_EVENT_NAME.NewTurn, (target: string) => inTurn(target === id));
  useListenServerEvent(SERVER_EVENT_NAME.CardPlayed, () => inTurn(false));

  useEffect(() => {
    socket.once(SERVER_EVENT_NAME.GameOver, () => inTurn(false));
  }, []);

  return isInturn;
};
