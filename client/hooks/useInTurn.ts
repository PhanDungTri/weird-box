import { useState } from "react";
import { SERVER_EVENT_NAME } from "../../shared/@types";
import { useListenServerEvent } from "./useListenServerEvent";

export const useInTurn = (id: string): boolean => {
  const [isInturn, inTurn] = useState(false);

  useListenServerEvent(SERVER_EVENT_NAME.NewTurn, (target: string) => inTurn(target === id));
  useListenServerEvent(SERVER_EVENT_NAME.CardPlayed, () => inTurn(false));
  useListenServerEvent(SERVER_EVENT_NAME.GameOver, () => inTurn(false));

  return isInturn;
};
