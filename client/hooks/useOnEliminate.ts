import { useEffect, useState } from "react";
import { SERVER_EVENT_NAME } from "../../shared/@types";
import socket from "../services/socket";

export const useOnEliminate = (id: string): boolean => {
  const [isEliminated, eliminate] = useState(false);

  useEffect(() => {
    const onEliminatePlayer = (target: string) => target === id && eliminate(true);
    socket.on(SERVER_EVENT_NAME.PlayerEliminated, onEliminatePlayer);
    return () => void socket.off(SERVER_EVENT_NAME.PlayerEliminated, onEliminatePlayer);
  }, []);

  return isEliminated;
};
