import { useState } from "react";
import { SERVER_EVENT_NAME } from "../../shared/constants";
import { useListenServerEvent } from "./useListenServerEvent";

export const useOnEliminate = (id: string): boolean => {
  const [isEliminated, eliminate] = useState(false);
  useListenServerEvent(SERVER_EVENT_NAME.PlayerEliminated, (target: string) => eliminate(target === id));
  return isEliminated;
};
